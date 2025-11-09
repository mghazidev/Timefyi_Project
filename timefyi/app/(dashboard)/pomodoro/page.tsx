"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TCalendar from "@/components/shared/TCalender";
import TaskIcon from "@/components/icons/TaskIcon";
import Input from "@/components/ui/input";
import BackArrowIcon from "@/components/icons/BackArrowIcon";
import { Button } from "@/components/ui/button";
import PlusIcon from "@/components/icons/PlusIcon";

import TTaskRow from "@/components/shared/TTaskRow";

const Page = () => {
  const [selected, setSelected] = React.useState<"pending" | "completed">(
    "pending"
  );
  const [playingTaskId, setPlayingTaskId] = React.useState<string | null>(null);

  // ✅ New States
  const [showSection2, setShowSection2] = React.useState(true); // "No task" section
  const [showSection3, setShowSection3] = React.useState(false); // Add task input section
  const [showSection4, setShowSection4] = React.useState(false); // "Add new task" button
  const [showSection5, setShowSection5] = React.useState(false); // Task list
  const [tasks, setTasks] = React.useState<string[]>([]); // Store added tasks
  const [newTask, setNewTask] = React.useState("");

  const handleSelect = (value: "pending" | "completed") => {
    if (selected !== value) setSelected(value);
  };

  // When user clicks "Add a new task" from Section 2
  const handleStartAdding = () => {
    setShowSection2(false);
    setShowSection3(true);
  };

  // When user clicks "Save"
  const handleSaveTask = () => {
    if (newTask.trim() === "") return;
    setTasks((prev) => [...prev, newTask.trim()]);
    setNewTask("");
    setShowSection3(false);
    setShowSection4(true);
    setShowSection5(true);
  };

  // When user clicks "Cancel"
  const handleCancel = () => {
    setNewTask("");
    // If no task was added yet, show the empty state again
    if (tasks.length === 0) {
      setShowSection3(false);
      setShowSection2(true);
    } else {
      setShowSection3(false);
      setShowSection4(true);
    }
  };

  // When user clicks "Add new task" button (Section 4)
  const handleAddNewClick = () => {
    setShowSection3(true);
    setShowSection4(false);
  };

  return (
    <div className="h-[100%] w-full grid gap-3 grid-cols-[1.2fr_3fr]">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 transition-all lg:flex-grow lg:p-2">
        {/* ---------------- Section 1 ---------------- */}
        <div className="flex justify-between gap-3 p-2 ">
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
              <Label htmlFor="completed" className="text-zinc-700">
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
        {/* ---------------- End of Section 1 ---------------- */}

        {/* ---------------- Section 2 ---------------- */}
        {showSection2 && (
          <div className="relative flex-grow h-[calc(100%-60px)] ">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm text-zinc-600">
              <TaskIcon size={48} className="text-zinc-800" />
              <p>No tasks for this day</p>
              <button
                onClick={handleStartAdding}
                className="text-zinc-500 underline underline-offset-2 hover:text-zinc-300 cursor-pointer"
              >
                Add a new task
              </button>
            </div>
          </div>
        )}
        {/* ---------------- End of Section 2 ---------------- */}

        {/* ---------------- Section 5 ---------------- */}
        {showSection5 &&
          tasks.map((task, index) => (
            <TTaskRow
              key={index}
              id={`task-${index}`}
              label={task}
              isPlaying={playingTaskId === `task-${index}`}
              onPlay={(id) =>
                setPlayingTaskId((prev) => (prev === id ? null : id))
              }
            />
          ))}
        {/* ---------------- End of Section 5 ---------------- */}

        {/* ---------------- Section 3 ---------------- */}
        {showSection3 && (
          <div className="flex flex-col items-start gap-3 p-3 border border-zinc-700 rounded-md my-2">
            <Input
              placeholder="Type and press enter to save or esc to cancel"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveTask();
                if (e.key === "Escape") handleCancel();
              }}
            />
            <div className="flex justify-between items-center text-zinc-500 text-xs w-full">
              <div className="flex items-center justify-start gap-2 text-zinc-500">
                <button
                  onClick={handleSaveTask}
                  className="flex items-center gap-1 uppercase hover:text-zinc-200 cursor-pointer"
                >
                  <span className="bg-zinc-800 px-3 rounded-md py-1 ">
                    <BackArrowIcon size={16} />
                  </span>
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 uppercase hover:text-zinc-200 cursor-pointer"
                >
                  <span className="uppercase bg-zinc-800 px-3 py-1 rounded-md">
                    Esc
                  </span>
                  <span>Cancel</span>
                </button>
              </div>
              <TCalendar />
            </div>
          </div>
        )}
        {/* ---------------- End of Section 3 ---------------- */}

        {/* ---------------- Section 4 ---------------- */}
        {showSection4 && (
          <div>
            <Button variant={"dotted"} onClick={handleAddNewClick}>
              <PlusIcon size={18} />
              Add new Task
            </Button>
          </div>
        )}
        {/* ---------------- End of Section 4 ---------------- */}
      </div>

      {/* Right Side */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800"></div>
    </div>
  );
};

export default Page;
