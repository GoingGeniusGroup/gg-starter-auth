import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import { FormControl, FormField, FormLabel, FormMessage } from "./form";

import { FormItem } from "@/app/components/ui/form";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";

type FormSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: { id?: string; label: string; value: string }[];
  isPending?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  id?: boolean;
  idx?: number;
  onValueChange?: (idx: number, value: string) => void;
};

const SelectModel = <T extends FieldValues>(props: FormSelectProps<T>) => {
  const {
    control,
    name,
    label,
    options,
    isPending,
    disabled,
    defaultValue,
    idx,
    id = false,

    onValueChange,
  } = props;

  const validOptions = options.filter((option) => option.value !== "");

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Select.Root
                {...field}
                onValueChange={(value) => {
                  if (onValueChange && idx !== undefined && id) {
                    onValueChange(idx, value);
                  } else {
                    field.onChange(value);
                  }
                }}
                disabled={isPending || disabled}
              >
                <Select.Trigger
                  className={cn(
                    "p-2 border-2 border-indigo-500 rounded-md flex gap-4 items-center text-sm text-gray-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out",
                    fieldState.error && "border-red-500"
                  )}
                >
                  <Select.Value
                    placeholder={defaultValue || "Select an option..."}
                  />
                  <Select.Icon className="text-gray-500">
                    <ChevronDownIcon />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content className="mt-2 w-full bg-white shadow-lg rounded-md border border-gray-300 z-50">
                    <Select.ScrollUpButton className="flex items-center justify-center p-2 hover:bg-gray-100">
                      <ChevronUpIcon />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="p-2">
                      <Select.Group>
                        <Select.Label className="px-2 py-1 text-xs text-gray-500">
                          {label || ""}
                        </Select.Label>
                        {validOptions.map((option) => (
                          <Select.Item
                            key={option.value}
                            value={option.value}
                            className="p-2 rounded-md text-sm text-gray-700 hover:bg-indigo-500 hover:text-white cursor-pointer"
                          >
                            <Select.ItemText>{option.label}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        </>
      )}
    />
  );
};

SelectModel.displayName = "SelectModel";

export { SelectModel };
