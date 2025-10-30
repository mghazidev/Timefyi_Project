"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
        ? defaultValue
        : [min, max],
    [value, defaultValue, min, max]
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex w-full cursor-pointer touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <div className="relative w-full flex items-center">
        <span
          className={cn(
            "absolute left-0 z-10 w-2 h-2 rounded-full -translate-x-1/2 ",
            isHovered || isDragging ? "bg-zinc-200" : "bg-zinc-700"
          )}
        ></span>

        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "relative grow overflow-hidden rounded-full  data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1",
            isHovered || isDragging ? "bg-zinc-700" : "bg-zinc-700"
          )}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(
              "bg-zinc-200 absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
              isHovered || isDragging ? "bg-zinc-200" : "bg-zinc-700"
            )}
          />
        </SliderPrimitive.Track>
        <span
          className={cn(
            "absolute right-0 w-2 h-2 rounded-full translate-x-1/2 ",
            isHovered || isDragging ? "bg-zinc-700" : "bg-zinc-700"
          )}
        ></span>
      </div>

      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb key={index} asChild>
          <div
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onTouchEnd={() => setIsDragging(false)}
            className={cn(
              "flex items-center justify-center focus:outline-none transition-all",
              isHovered || isDragging
                ? "w-6 h-6 bg-zinc-200 shadow-md rounded-full"
                : "w-2 h-2 bg-zinc-700 rounded-full"
            )}
            style={{
              pointerEvents: "auto",
              userSelect: "none",
              touchAction: "none",
            }}
          >
            {(isHovered || isDragging) && (
              <Code2 className="w-3 h-3 text-black" />
            )}
          </div>
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
