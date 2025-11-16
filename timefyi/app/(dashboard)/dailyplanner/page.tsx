"use client";
import React from "react";
import ReverseIcon from "@/components/icons/ReverseIcon";
import TaskIcon from "@/components/icons/TaskIcon";
import {
  ChevronLeft,
  ChevronRight,
  CalendarCheck,
  Calendar,
} from "lucide-react";
import DailyPlannerTaskSection from "@/components/sections/DailyPlannerTaskSection";
import RoutineSection from "@/components/sections/RoutineSection";
import TaskDumpSection from "@/components/sections/TaskDumpSection";
const page = () => {
  const [activeTab, setActiveTab] = React.useState<
    "daily" | "routine" | "dump"
  >("daily");

  return (
    <div className="h-[100%] overflow-hidden">
      <div className="flex items-center justify-between mb-3 ">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("daily")}
            className={`
              flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm font-medium
              ${
                activeTab === "daily"
                  ? "border-yellow-400 bg-yellow-400 text-black"
                  : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
              }
            `}
          >
            <CalendarCheck size={16} />
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              Daily Planner
            </span>
          </button>
          <button
            onClick={() => setActiveTab("routine")}
            className={`
              flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm font-medium
              ${
                activeTab === "routine"
                  ? "border-yellow-400 bg-yellow-400 text-black"
                  : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
              }
            `}
          >
            <ReverseIcon size={16} />
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              Routine
            </span>
          </button>
          <button
            onClick={() => setActiveTab("dump")}
            className={`
              flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm font-medium
              ${
                activeTab === "dump"
                  ? "border-yellow-400 bg-yellow-400 text-black"
                  : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
              }
            `}
          >
            <TaskIcon size={16} />
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              Task Dump
            </span>
          </button>
        </div>
        <div className="flex">
          <button className="mr-2 flex items-center justify-between gap-1.5 rounded-md bg-zinc-800 px-3 py-1.5 text-sm text-zinc-400 outline-none hover:bg-zinc-700 hover:text-zinc-200 focus-visible:shadow-[0_0_0_1px] focus-visible:shadow-zinc-900">
            Today
          </button>
          <button
            className="mr-2 flex h-[32px] items-center rounded-md bg-zinc-800 px-3 py-1.5 text-sm text-zinc-400 outline-none hover:bg-zinc-700 hover:text-zinc-200 focus-visible:shadow-[0_0_0_1px] focus-visible:shadow-zinc-900"
            value="11/16/2025"
          >
            <Calendar size={16} />
          </button>
          <button className="rounded-md p-1 text-zinc-600 hover:bg-zinc-700 hover:text-zinc-300">
            <ChevronLeft size={18} />
          </button>
          <button className="rounded-md p-1 text-zinc-600 hover:bg-zinc-700 hover:text-zinc-300">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      {activeTab === "daily" && <DailyPlannerTaskSection />}
      {activeTab === "routine" && <RoutineSection />}
      {activeTab === "dump" && <TaskDumpSection />}
    </div>
  );
};

export default page;
