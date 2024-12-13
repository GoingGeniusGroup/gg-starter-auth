"use client";

import { forwardRef, useEffect, useMemo, useState, useTransition } from "react";
import { HexColorPicker } from "react-colorful";
import { cn } from "@/lib/utils";
import { useForwardedRef } from "@/lib/use-forwarded-ref";
import type { ButtonProps } from "@/components/ui/button/button";
import { Button } from "@/components/ui/button/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover/popover";
import { Input } from "@/components/ui/input";
import { ThemeType } from "@prisma/client";
import { useTransform } from "framer-motion";
import { postColors } from "@/services/color";
import { toast } from "sonner";

import { useMobileSimulator } from "@/components/MobileSimulator/provider/MobileSimulatorContext";
import { SpinningButton } from "../ui/spinning-button";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  typeColor: ThemeType;
  onBlur?: () => void;
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ButtonProps, "value" | "onChange" | "onBlur"> & ColorPickerProps
>(
  (
    { disabled, value, typeColor, onChange, onBlur, name, className, ...props },
    forwardedRef
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [open, setOpen] = useState(false);

    const { ColorPickerAttrs } = useMobileSimulator();
    const { setTextColor, setCurrentBackground, tempColor } = ColorPickerAttrs;
    // console.log(tempColor);

    // useEffect(()=>{
    //   setTempColor(value)
    // },[])

    const [ispending, startTranstion] = useTransition();

    const parsedValue = useMemo(() => {
      return value || "#FFFFFF";
    }, [value]);

    const postColor = (value: string, typeColor: ThemeType) => {
      startTranstion(async () => {
        try {
          const res = await postColors(value, typeColor);
          if (!res) {
            toast.error("something went wrong!");
          }
          if (!res.success) {
            toast.error(res.error.message);
          }
          if (res.success) {
            toast.success(res?.message);
          }
        } catch (error) {
          console.log(error);

          toast.error("something went wrong!");
        }
      });
    };

    const handleCancel = () => {
      const tempValue = tempColor.find(
        (colorObj) => colorObj.typeColor === typeColor
      )?.value;

      if (!tempValue) {
        setOpen(false);
        return;
      }

      setOpen(false);

      if (typeColor === "TEXT") {
        setTextColor(tempValue as string);
      } else {
        setCurrentBackground({
          name: "Custom Color",
          class: `bg-[${tempValue}]`,
        });
      }
    };

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
          <Button
            {...props}
            className={cn("block", className)}
            name={name}
            onClick={() => {
              setOpen(true);
            }}
            size="small"
            style={{
              backgroundColor: parsedValue,
            }}
            variant="outline"
          >
            <div />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[169px]">
          <HexColorPicker
            color={parsedValue}
            onChange={onChange}
            // Add width and height for smaller size
            style={{ width: "150px", height: "150px" }}
          />

          <Input
            maxLength={7}
            onChange={(e) => {
              onChange(e?.currentTarget?.value);
            }}
            ref={ref}
            value={parsedValue}
          />
          <div className="flex gap-2">
            <Button size={"sm"} variant={"destructive"} onClick={handleCancel}>
              Cancel
            </Button>
            <SpinningButton
              size={"sm"}
              className="bg-indigo-500 hover:bg-indigo-700"
              onClick={() => postColor(value, typeColor)}
              isLoading={ispending}
            >
              Save
            </SpinningButton>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
