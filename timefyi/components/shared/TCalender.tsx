"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function TCalendar({ className }: any) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [month, setMonth] = React.useState(
    date?.getMonth() ?? new Date().getMonth()
  );
  const [year, setYear] = React.useState(
    date?.getFullYear() ?? new Date().getFullYear()
  );

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDays = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const grid = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      grid.push({ day: prevMonthDays - i, current: false });
    }
    for (let i = 1; i <= lastDate; i++) {
      grid.push({ day: i, current: true });
    }
    while (grid.length % 7 !== 0) {
      grid.push({ day: grid.length - lastDate - firstDay + 1, current: false });
    }
    return grid;
  };

  const days = getDays(month, year);

  const changeMonth = (offset: number) => {
    const newMonth = month + offset;
    const newDate = new Date(year, newMonth, 1);
    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1 rounded-sm bg-zinc-800 p-1 px-2 text-xs cursor-pointer text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700",
            className
          )}
        >
          <CalendarIcon size={12} />
          {date ? format(date, "dd MMM") : "Pick date"}
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[250px] bg-zinc-900 border-none rounded-2xl shadow-lg p-0"
        align="end"
      >
        <div className="flex items-center border-none justify-between px-4 pt-3 bg-zinc-800 rounded-t-2xl ">
          <button
            onClick={() => changeMonth(-1)}
            className="p-1 rounded-md hover:bg-zinc-500 text-zinc-200"
          >
            <ChevronLeft size={18} />
          </button>
          <p className="text-xs text-zinc-300 font-medium">
            {new Date(year, month).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </p>
          <button
            onClick={() => changeMonth(1)}
            className="p-1 rounded-md hover:bg-zinc-500 text-zinc-200   "
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-7 text-center px-1 text-xs text-zinc-500 bg-zinc-800 border-b border-zinc-700">
          {daysOfWeek.map((d) => (
            <div key={d} className="py-2">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs text-zinc-500 p-1">
          {days.map((d, i) => (
            <button
              key={i}
              onClick={() => d.current && setDate(new Date(year, month, d.day))}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-md transition-colors",
                d.current ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-600",
                date?.getDate() === d.day &&
                  date?.getMonth() === month &&
                  date?.getFullYear() === year &&
                  "bg-zinc-700 text-white"
              )}
            >
              {d.day}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
