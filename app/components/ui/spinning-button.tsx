import React from "react";
import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";

interface SpinningButtonProps extends ButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export function SpinningButton({
  children,
  isLoading,
  ...props
}: SpinningButtonProps) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {/* Submitting... */}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
