"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TCalendar from "@/components/shared/TCalender";
import TaskIcon from "@/components/icons/TaskIcon";
import Input from "@/components/ui/input";
import BackArrowIcon from "@/components/icons/BackArrowIcon";
const page = () => {
  const [selected, setSelected] = React.useState<"pending" | "completed">(
    "pending"
  );

  const handleSelect = (value: "pending" | "completed") => {
    if (selected !== value) setSelected(value);
  };
  return (
    <div className="h-[100%] w-full grid gap-3 grid-cols-[1.2fr_3fr]">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 transition-all lg:flex-grow lg:p-2">
        <div className="flex justify-between gap-3 p-2">
          <div className="flex justify-start gap-1">
            <div
              className={`flex items-center gap-1 rounded-md px-2 cursor-pointer ${
                selected === "pending" ? "bg-zinc-800" : "hover:bg-zinc-800"
              }`}
              onClick={() => handleSelect("pending")}
            >
              <Checkbox
                id="pending"
                checked={selected === "pending"}
                onCheckedChange={() => handleSelect("pending")}
              />
              <Label htmlFor="pending" className="text-zinc-500">
                Pending
              </Label>
            </div>
            <div
              className={`flex items-center gap-1 rounded-md px-2 cursor-pointer ${
                selected === "completed" ? "bg-zinc-800" : "hover:bg-zinc-800"
              }`}
              onClick={() => handleSelect("completed")}
            >
              <Checkbox
                id="completed"
                checked={selected === "completed"}
                onCheckedChange={() => handleSelect("completed")}
              />
              <Label htmlFor="completed" className="text-zinc-500">
                Completed
              </Label>
            </div>
          </div>
          <div className="flex justify-end items-center gap-1">
            <TCalendar />
            <div className="flex items-center gap-1 text-zinc-500">
              <div className="hover:bg-zinc-800 p-1 rounded">
                <ChevronLeft size={16} />
              </div>
              <div className="hover:bg-zinc-800 p-1 rounded">
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="relative flex-grow h-[calc(100%-60px)] ">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm text-zinc-600">
            <TaskIcon size={48} className="text-zinc-800" />
            <p>No tasks for this day</p>
            <button className="text-zinc-500 underline underline-offset-2 hover:text-zinc-300 cursor-pointer">
              Add a new task
            </button>
          </div>
        </div> */}

        <div className="flex flex-col items-start gap-3 p-3 border border-zinc-700 rounded-md my-2">
          <Input placeholder="Type and press enter to save or esc to cancel" />
          <div className="flex justify-between items-center text-zinc-500 text-xs w-full">
            <div className="flex items-center justify-start gap-2 text-zinc-500">
              <button className="flex items-center gap-1 uppercase hover:text-zinc-200 cursor-pointer">
                <span className="bg-zinc-800 px-3 rounded-md py-1 ">
                  <BackArrowIcon size={16} />
                </span>
                <span>Save</span>
              </button>
              <button className="flex items-center gap-1 uppercase hover:text-zinc-200 cursor-pointer">
                <span className="uppercase bg-zinc-800 px-3 py-1 rounded-md">
                  Esc
                </span>
                <span>Cancel</span>
              </button>
            </div>
            <TCalendar />
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800"></div>
    </div>
  );
};

export default page;
