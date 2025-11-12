"use client";
import React, { useRef, useState } from "react";
import PictureModeIcon from "@/components/icons/PictureModeIcon";
import EditableIcon from "@/components/icons/EditableIcon";
import FullscreenIcon from "@/components/icons/FullscreenIcon";
import SmallScreenIcon from "../icons/SmallScreenIcon";
import TPomodoroDurationDialog from "../shared/TPomodoroDurationDialog";
import { Button } from "../ui/button";
import ProgressBar from "../ui/progressbar";

export default function PomodoroRightLayout() {
  const rightSideRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [defaultDuration, setDefaultDuration] = useState(25 * 60);
  const [shortBreak, setShortBreak] = useState(5 * 60);
  const [longBreak, setLongBreak] = useState(15 * 60);

  const [totalDuration, setTotalDuration] = useState(defaultDuration);
  const [activeTab, setActiveTab] = useState<"focus" | "short" | "long">(
    "focus"
  );
  const progress = totalDuration === 0 ? 0 : (elapsed / totalDuration) * 100;

  React.useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setElapsed((prev) => {
        if (prev >= totalDuration) {
          clearInterval(interval);
          setIsRunning(false);
          return totalDuration;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, totalDuration]);

  const handleToggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await rightSideRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleAddTime = (minutes: number) => {
    setTotalDuration((prev) => prev + minutes * 60);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsed(0);
    setTotalDuration(defaultDuration);
    setActiveTab("focus");
  };

  const handleDialogSave = ({
    pomodoroMinutes,
    shortBreakMinutes,
    longBreakMinutes,
  }: {
    pomodoroMinutes: number;
    shortBreakMinutes: number;
    longBreakMinutes: number;
  }) => {
    const newPomodoro = pomodoroMinutes * 60;
    setDefaultDuration(newPomodoro);
    setShortBreak(shortBreakMinutes * 60);
    setLongBreak(longBreakMinutes * 60);
    setTotalDuration(newPomodoro);
    setElapsed(0);
    setIsRunning(false);
    setActiveTab("focus");
  };

  return (
    <div
      ref={rightSideRef}
      className="flex flex-col p-3 bg-zinc-900 rounded-2xl border border-zinc-800 transition-all duration-300"
    >
      <div className="flex gap-2 justify-end text-zinc-500">
        <PictureModeIcon size={16} className="hover:text-zinc-200" />
        <button
          onClick={() => setIsDialogOpen(true)}
          title="Edit Pomodoro Duration"
        >
          <EditableIcon size={16} className="hover:text-zinc-200" />
        </button>
        <button
          onClick={handleToggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          className="hover:text-zinc-200 transition-colors"
        >
          {isFullscreen ? (
            <SmallScreenIcon size={16} />
          ) : (
            <FullscreenIcon size={16} />
          )}
        </button>
      </div>

      <div className="flex flex-col gap-3 h-full text-center justify-center align-center w-full text-zinc-300">
        <div className="text-center flex gap-3 justify-center">
          <Button
            variant={"ghost"}
            className={`rounded ${
              activeTab === "focus" ? "bg-zinc-800" : "hover:text-zinc-200"
            }`}
            onClick={() => {
              setTotalDuration(defaultDuration);
              setElapsed(0);
              setIsRunning(false);
              setActiveTab("focus");
            }}
          >
            Focus
          </Button>
          <Button
            variant={"ghost"}
            className={`rounded ${
              activeTab === "short" ? "bg-zinc-800" : "hover:text-zinc-200"
            }`}
            onClick={() => {
              setTotalDuration(shortBreak);
              setElapsed(0);
              setIsRunning(false);
              setActiveTab("short");
            }}
          >
            Short Break
          </Button>
          <Button
            variant={"ghost"}
            className={`rounded ${
              activeTab === "long" ? "bg-zinc-800" : "hover:text-zinc-200"
            }`}
            onClick={() => {
              setTotalDuration(longBreak);
              setElapsed(0);
              setIsRunning(false);
              setActiveTab("long");
            }}
          >
            Long Break
          </Button>
        </div>
        <div className="relative text-6xl font-bold text-gray-100 sm:text-8xl md:text-8xl lg:text-8xl xl:text-9xl">
          <div className="flex gap-1.5 justify-center">
            <span>
              {String(Math.floor((totalDuration - elapsed) / 60)).padStart(
                2,
                "0"
              )}
            </span>
            <span className={`mx-2 ${isRunning ? "blink-colon" : ""}`}>:</span>

            <span>
              {String((totalDuration - elapsed) % 60).padStart(2, "0")}
            </span>
          </div>
        </div>
        <ProgressBar progress={progress} />
        <div className="flex gap-4 my-4 justify-center">
          {[25, 10, 5, 1].map((min) => (
            <button
              key={min}
              onClick={() => handleAddTime(min)}
              className="hover:text-zinc-200 text-zinc-500 cursor-pointer"
            >
              + {min} min
            </button>
          ))}
        </div>
        <div className="w-auto flex justify-center gap-3">
          <Button
            variant={"ghost"}
            className="bg-zinc-800 rounded-md hover:text-zinc-300"
            onClick={() => {
              setIsRunning((prev) => !prev);
            }}
          >
            {isRunning ? "Pause" : elapsed > 0 ? "Resume" : "Start"}
          </Button>

          {elapsed > 0 && (
            <Button
              variant={"ghost"}
              className="bg-zinc-800 rounded-md hover:text-zinc-300"
              onClick={handleReset}
            >
              Reset
            </Button>
          )}
        </div>
      </div>
      <TPomodoroDurationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        pomodoroMinutes={defaultDuration / 60}
        shortBreakMinutes={shortBreak / 60}
        longBreakMinutes={longBreak / 60}
        onSave={handleDialogSave}
      />
    </div>
  );
}
