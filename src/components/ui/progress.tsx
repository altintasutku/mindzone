"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";
interface CustomProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorColor?: string;
  showValue?: boolean;
}
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CustomProgressProps
>(
  (
    {
      className,
      value,
      indicatorColor = "bg-primary",
      showValue = false,
      ...props
    },
    ref
  ) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-5 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      {showValue && (
        <div
          className={cn(
            "absolute z-10 flex justify-center items-center text-sm w-full",
            {
              "text-black dark:text-white": value && value < 50,
              "text-white": value && value >= 50,
            }
          )}
        >
          {"%" + Math.ceil(value || 0)}
        </div>
      )}
      <ProgressPrimitive.Indicator
        className={cn("h-full w-full flex-1 transition-all", indicatorColor)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
