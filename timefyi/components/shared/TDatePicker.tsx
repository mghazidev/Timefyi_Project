"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import "../../app/datepicker.css";

interface TDatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const TDatePicker: React.FC<TDatePickerProps> = ({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  disabled = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(value);

  React.useEffect(() => {
    if (value) setDate(value);
  }, [value]);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange?.(selectedDate);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          disabled={disabled}
          className={cn(
            "z-50 cursor-pointer border-b border-dashed border-current leading-tight hover:text-neutral-300 focus:outline-none relative z-[20] cursor-pointer",
            className
          )}
        >
          {date ? format(date, "MMM dd, yyyy") : placeholder}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-zinc-900 border-none">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={handleSelect}
          className="text-white dark"
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
