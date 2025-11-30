"use client";
import React from "react";
import ReverseIcon from "../icons/ReverseIcon";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";

const days = [
  { day: "Sun" },
  { day: "Mon" },
  { day: "Tue" },
  { day: "Wed" },
  { day: "Thu" },
  { day: "Fri" },
  { day: "Sat" },
];

const dates = Array.from({ length: 28 }, (_, i) => i + 1);

const RoutineSection = () => {
  const [selectedTab, setSelectedTab] = React.useState("Daily");

  const toggleButtonClasses = (tab: any) =>
    `py-1 px-3 rounded-sm cursor-pointer ${
      selectedTab === tab
        ? "bg-zinc-700 text-zinc-300"
        : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"
    }`;
  return (
    <div className="relative flex min-h-[100%] flex-grow flex-col justify-center items-center rounded-2xl border border-zinc-800 bg-zinc-900 px-4 pb-4">
      <ReverseIcon size={48} className="text-zinc-800 mb-3" />
      <h2 className="mb-1.5 text-lg text-zinc-400">No routines found</h2>
      <p className="mb-4 text-zinc-600">
        Tasks that automatically get added to your daily to-do list
      </p>

      <Dialog>
        <DialogTrigger asChild>
          <button className="text-base text-zinc-500 underline underline-offset-2 hover:text-zinc-300">
            Add a new Routine
          </button>
        </DialogTrigger>

        <DialogContent className="bg-zinc-900 border-zinc-800 w-full max-w-[260px] w-[360px] px-3">
          <DialogHeader>
            <DialogTitle />
          </DialogHeader>

          <div className="mt-4 flex flex-col gap-2">
            <Label className="text-sm text-zinc-400">
              Enter the routine task
            </Label>
            <input
              className="w-full p-2 rounded-md bg-zinc-800 text-sm text-zinc-300 outline-none placeholder-zinc-500"
              placeholder="Routine task"
            />
            <Label className="mt-2 text-sm text-zinc-400">
              Select the routine frequency
            </Label>
            <div className="flex gap-2 justify-start text-sm text-zinc-500">
              <button
                className={toggleButtonClasses("Daily")}
                onClick={() => setSelectedTab("Daily")}
              >
                Daily
              </button>
              <button
                className={toggleButtonClasses("Weekly")}
                onClick={() => setSelectedTab("Weekly")}
              >
                Weekly
              </button>
              <button
                className={toggleButtonClasses("Bi-Weekly")}
                onClick={() => setSelectedTab("Bi-Weekly")}
              >
                Bi-Weekly
              </button>
              <button
                className={toggleButtonClasses("Monthly")}
                onClick={() => setSelectedTab("Monthly")}
              >
                Monthly
              </button>
            </div>

            {(selectedTab === "Weekly" || selectedTab === "Bi-Weekly") && (
              <>
                <Label className="mt-2 text-sm text-zinc-400">
                  Select the week days
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-zinc-500 text-sm">
                  {days.map((data, ind) => (
                    <button
                      key={ind}
                      className="py-1 px-3 rounded-sm cursor-pointer bg-zinc-800 hover:bg-zinc-700 hover:text-zinc-300"
                    >
                      {data.day}
                    </button>
                  ))}
                </div>
              </>
            )}

            {selectedTab === "Monthly" && (
              <>
                <Label className="mt-2 text-sm text-zinc-400">
                  Select the dates
                </Label>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 text-sm gap-2 text-zinc-500">
                  {dates.map((date, ind) => (
                    <button
                      key={ind}
                      className="py-1 px-2 rounded-sm cursor-pointer bg-zinc-800 hover:bg-zinc-700"
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button className="bg-zinc-600 text-zinc-300 font-normal w-full hover:bg-zinc-500">
              Create Routine
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoutineSection;
