// "use client";
// import React, { useRef, useState } from "react";
// import PictureModeIcon from "@/components/icons/PictureModeIcon";
// import EditableIcon from "@/components/icons/EditableIcon";
// import FullscreenIcon from "@/components/icons/FullscreenIcon";
// import SmallScreenIcon from "../icons/SmallScreenIcon";
// import TPomodoroDurationDialog from "../shared/TPomodoroDurationDialog";
// import { Button } from "../ui/button";
// import ProgressBar from "../ui/progressbar";

// interface Props {
//   isPlaying: boolean;
//   activeTaskId: string | null;
//   onPause: () => void;
//   onReset: () => void;
// }

// export default function PomodoroRightLayout({
//   isPlaying,
//   activeTaskId,
//   onPause,
//   onReset,
// }: Props) {
//   const rightSideRef = useRef<HTMLDivElement>(null);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isRunning, setIsRunning] = useState(false);
//   const [elapsed, setElapsed] = useState(0);
//   const [defaultDuration, setDefaultDuration] = useState(25 * 60);
//   const [shortBreak, setShortBreak] = useState(5 * 60);
//   const [longBreak, setLongBreak] = useState(15 * 60);

//   const [totalDuration, setTotalDuration] = useState(defaultDuration);
//   const [activeTab, setActiveTab] = useState<"focus" | "short" | "long">(
//     "focus"
//   );
//   const progress = totalDuration === 0 ? 0 : (elapsed / totalDuration) * 100;

//   React.useEffect(() => {
//     if (isPlaying) {
//       setIsRunning(true);
//     } else {
//       setIsRunning(false);
//     }
//   }, [isPlaying]);

//   React.useEffect(() => {
//     if (activeTaskId) {
//       setElapsed(0);
//     }
//   }, [activeTaskId]);

//   React.useEffect(() => {
//     if (!isRunning) return;

//     const interval = setInterval(() => {
//       setElapsed((prev) => {
//         if (prev + 1 >= totalDuration) {
//           clearInterval(interval);
//           setIsRunning(false);
//           onPause();
//           return totalDuration;
//         }
//         return prev + 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [isRunning, totalDuration]);

//   const handleToggleFullscreen = async () => {
//     if (!document.fullscreenElement) {
//       await rightSideRef.current?.requestFullscreen();
//       setIsFullscreen(true);
//     } else {
//       await document.exitFullscreen();
//       setIsFullscreen(false);
//     }
//   };

//   const handleAddTime = (minutes: number) => {
//     setTotalDuration((prev) => prev + minutes * 60);
//   };

//   const handleReset = () => {
//     setIsRunning(false);
//     setElapsed(0);
//     if (activeTab === "focus") setTotalDuration(defaultDuration);
//     if (activeTab === "short") setTotalDuration(shortBreak);
//     if (activeTab === "long") setTotalDuration(longBreak);

//     onReset();
//   };

//   const handleDialogSave = ({
//     pomodoroMinutes,
//     shortBreakMinutes,
//     longBreakMinutes,
//   }: {
//     pomodoroMinutes: number;
//     shortBreakMinutes: number;
//     longBreakMinutes: number;
//   }) => {
//     const p = pomodoroMinutes * 60;
//     const s = shortBreakMinutes * 60;
//     const l = longBreakMinutes * 60;
//     setDefaultDuration(p);
//     setShortBreak(s);
//     setLongBreak(l);

//     if (activeTab === "focus") setTotalDuration(p);
//     if (activeTab === "short") setTotalDuration(s);
//     if (activeTab === "long") setTotalDuration(l);
//     setElapsed(0);
//     setIsRunning(false);
//     setActiveTab("focus");
//   };

//   return (
//     <div
//       ref={rightSideRef}
//       className="flex flex-col p-3 bg-zinc-900 rounded-2xl border border-zinc-800 transition-all duration-300"
//     >
//       <div className="flex gap-2 justify-end text-zinc-500">
//         <PictureModeIcon size={16} className="hover:text-zinc-200" />
//         <button
//           onClick={() => setIsDialogOpen(true)}
//           title="Edit Pomodoro Duration"
//         >
//           <EditableIcon size={16} className="hover:text-zinc-200" />
//         </button>
//         <button
//           onClick={handleToggleFullscreen}
//           title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
//           className="hover:text-zinc-200 transition-colors"
//         >
//           {isFullscreen ? (
//             <SmallScreenIcon size={16} />
//           ) : (
//             <FullscreenIcon size={16} />
//           )}
//         </button>
//       </div>

//       <div className="flex flex-col gap-3 h-full text-center justify-center align-center w-full text-zinc-300">
//         <div className="text-center flex gap-3 justify-center">
//           <Button
//             variant={"ghost"}
//             className={`rounded ${
//               activeTab === "focus" ? "bg-zinc-800" : "hover:text-zinc-200"
//             }`}
//             onClick={() => {
//               setTotalDuration(defaultDuration);
//               setElapsed(0);
//               setIsRunning(false);
//               setActiveTab("focus");
//             }}
//           >
//             Focus
//           </Button>
//           <Button
//             variant={"ghost"}
//             className={`rounded ${
//               activeTab === "short" ? "bg-zinc-800" : "hover:text-zinc-200"
//             }`}
//             onClick={() => {
//               setTotalDuration(shortBreak);
//               setElapsed(0);
//               setIsRunning(false);
//               setActiveTab("short");
//             }}
//           >
//             Short Break
//           </Button>
//           <Button
//             variant={"ghost"}
//             className={`rounded ${
//               activeTab === "long" ? "bg-zinc-800" : "hover:text-zinc-200"
//             }`}
//             onClick={() => {
//               setTotalDuration(longBreak);
//               setElapsed(0);
//               setIsRunning(false);
//               setActiveTab("long");
//             }}
//           >
//             Long Break
//           </Button>
//         </div>
//         <div className="relative text-6xl font-bold text-gray-100 sm:text-8xl md:text-8xl lg:text-8xl xl:text-9xl">
//           <div className="flex gap-1.5 justify-center">
//             <span>
//               {String(Math.floor((totalDuration - elapsed) / 60)).padStart(
//                 2,
//                 "0"
//               )}
//             </span>
//             <span className={`mx-2 ${isRunning ? "blink-colon" : ""}`}>:</span>

//             <span>
//               {String((totalDuration - elapsed) % 60).padStart(2, "0")}
//             </span>
//           </div>
//         </div>
//         <ProgressBar progress={progress} />
//         <div className="flex gap-4 my-4 justify-center">
//           {[25, 10, 5, 1].map((min) => (
//             <button
//               key={min}
//               onClick={() => handleAddTime(min)}
//               className="hover:text-zinc-200 text-zinc-500 cursor-pointer"
//             >
//               + {min} min
//             </button>
//           ))}
//         </div>
//         <div className="w-auto flex justify-center gap-3">
//           <Button
//             variant={"ghost"}
//             className="bg-zinc-800 rounded-md hover:text-zinc-300"
//             onClick={() => {
//               setIsRunning((prev) => !prev);
//             }}
//           >
//             {isRunning ? "Pause" : elapsed > 0 ? "Resume" : "Start"}
//           </Button>

//           {elapsed > 0 && (
//             <Button
//               variant={"ghost"}
//               className="bg-zinc-800 rounded-md hover:text-zinc-300"
//               onClick={handleReset}
//             >
//               Reset
//             </Button>
//           )}
//         </div>
//       </div>
//       <TPomodoroDurationDialog
//         open={isDialogOpen}
//         onOpenChange={setIsDialogOpen}
//         pomodoroMinutes={defaultDuration / 60}
//         shortBreakMinutes={shortBreak / 60}
//         longBreakMinutes={longBreak / 60}
//         onSave={handleDialogSave}
//       />
//     </div>
//   );
// }

"use client";
import React, { useRef, useState } from "react";
import PictureModeIcon from "@/components/icons/PictureModeIcon";
import EditableIcon from "@/components/icons/EditableIcon";
import FullscreenIcon from "@/components/icons/FullscreenIcon";
import SmallScreenIcon from "../icons/SmallScreenIcon";
import TPomodoroDurationDialog from "../shared/TPomodoroDurationDialog";
import { Button } from "../ui/button";
import ProgressBar from "../ui/progressbar";

interface Props {
  isPlaying: boolean; // from parent → task started
  activeTaskId: string | null;
  onPause: () => void;
  onReset: () => void;
}

export default function PomodoroRightLayout({
  isPlaying,
  activeTaskId,
  onPause,
  onReset,
}: Props) {
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

  // -----------------------------
  // PLAY / PAUSE COMING FROM TASK
  // -----------------------------
  React.useEffect(() => {
    if (isPlaying) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  }, [isPlaying]);

  // Reset elapsed when task changes
  React.useEffect(() => {
    if (activeTaskId) {
      setElapsed(0);
    }
  }, [activeTaskId]);

  // -----------------------------
  // TIMER TICK
  // -----------------------------
  React.useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setElapsed((prev) => {
        if (prev + 1 >= totalDuration) {
          clearInterval(interval);
          setIsRunning(false);
          onPause(); // tell parent stop playing
          return totalDuration;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, totalDuration]);

  // -----------------------------
  // FULLSCREEN
  // -----------------------------
  const handleToggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await rightSideRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // -----------------------------
  // TAB SWITCH HANDLER
  // -----------------------------
  const switchTab = (tab: "focus" | "short" | "long") => {
    setActiveTab(tab);
    setIsRunning(false);
    setElapsed(0);

    if (tab === "focus") setTotalDuration(defaultDuration);
    if (tab === "short") setTotalDuration(shortBreak);
    if (tab === "long") setTotalDuration(longBreak);

    onPause(); // Stop parent task timer
  };

  // -----------------------------
  // ADD TIME
  // -----------------------------
  const handleAddTime = (minutes: number) => {
    setTotalDuration((prev) => prev + minutes * 60);
  };

  // -----------------------------
  // RESET TIMER
  // -----------------------------
  const handleReset = () => {
    setIsRunning(false);
    setElapsed(0);

    if (activeTab === "focus") setTotalDuration(defaultDuration);
    if (activeTab === "short") setTotalDuration(shortBreak);
    if (activeTab === "long") setTotalDuration(longBreak);

    onReset(); // parent reset
  };

  // -----------------------------
  // DIALOG SAVE
  // -----------------------------
  const handleDialogSave = ({
    pomodoroMinutes,
    shortBreakMinutes,
    longBreakMinutes,
  }: {
    pomodoroMinutes: number;
    shortBreakMinutes: number;
    longBreakMinutes: number;
  }) => {
    const p = pomodoroMinutes * 60;
    const s = shortBreakMinutes * 60;
    const l = longBreakMinutes * 60;

    setDefaultDuration(p);
    setShortBreak(s);
    setLongBreak(l);

    if (activeTab === "focus") setTotalDuration(p);
    if (activeTab === "short") setTotalDuration(s);
    if (activeTab === "long") setTotalDuration(l);

    setElapsed(0);
    setIsRunning(false);
  };

  return (
    <div
      ref={rightSideRef}
      className="flex flex-col p-3 bg-zinc-900 rounded-2xl border border-zinc-800 transition-all duration-300"
    >
      {/* TOP RIGHT ICONS */}
      <div className="flex gap-2 justify-end text-zinc-500">
        <PictureModeIcon size={16} className="hover:text-zinc-200" />
        <button onClick={() => setIsDialogOpen(true)}>
          <EditableIcon size={16} className="hover:text-zinc-200" />
        </button>

        <button onClick={handleToggleFullscreen}>
          {isFullscreen ? (
            <SmallScreenIcon size={16} />
          ) : (
            <FullscreenIcon size={16} />
          )}
        </button>
      </div>

      {/* TABS */}
      <div className="flex flex-col gap-3 h-full text-center justify-center text-zinc-300">
        <div className="text-center flex gap-3 justify-center">
          <Button
            variant="ghost"
            className={
              activeTab === "focus" ? "bg-zinc-800 rounded" : "rounded"
            }
            onClick={() => switchTab("focus")}
          >
            Focus
          </Button>

          <Button
            variant="ghost"
            className={
              activeTab === "short" ? "bg-zinc-800 rounded" : "rounded"
            }
            onClick={() => switchTab("short")}
          >
            Short Break
          </Button>

          <Button
            variant="ghost"
            className={activeTab === "long" ? "bg-zinc-800 rounded" : "rounded"}
            onClick={() => switchTab("long")}
          >
            Long Break
          </Button>
        </div>

        {/* TIMER */}
        <div className="text-8xl font-bold text-gray-100">
          <span>
            {String(Math.floor((totalDuration - elapsed) / 60)).padStart(
              2,
              "0"
            )}
          </span>
          <span className={`mx-2 ${isRunning ? "blink-colon" : ""}`}>:</span>
          <span>{String((totalDuration - elapsed) % 60).padStart(2, "0")}</span>
        </div>

        {/* PROGRESS */}
        <ProgressBar progress={progress} />

        {/* ADD TIME */}
        <div className="flex gap-4 my-4 justify-center">
          {[25, 10, 5, 1].map((min) => (
            <button
              key={min}
              onClick={() => handleAddTime(min)}
              className="hover:text-zinc-200 text-zinc-500"
            >
              + {min} min
            </button>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 justify-center">
          <Button
            variant="ghost"
            className="bg-zinc-800 rounded-md"
            onClick={() => setIsRunning((prev) => !prev)}
          >
            {isRunning ? "Pause" : elapsed > 0 ? "Resume" : "Start"}
          </Button>

          {elapsed > 0 && (
            <Button
              variant="ghost"
              className="bg-zinc-800 rounded-md"
              onClick={handleReset}
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* DIALOG */}
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
