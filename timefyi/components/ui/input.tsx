"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  inputClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassName, inputClassName, ...props }, ref) => {
    return (
      <div
        className={cn("relative w-full flex items-center", containerClassName)}
      >
        <input
          ref={ref}
          className={cn(
            "w-full text-sm text-zinc-200 outline-none placeholder-zinc-600 bg-transparent",
            inputClassName,
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
