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
import getLocalDateString from "@/lib/helpers";
import TTaskRow from "@/components/shared/TTaskRow";
import RotateIcon from "@/components/icons/RotateIcon";
import PomodoroRightLayout from "@/components/sections/PomodoroRightLayout";

const today = getLocalDateString();

const Page = () => {
  const [selected, setSelected] = React.useState<"pending" | "completed">(
    "pending"
  );
  const [mode, setMode] = React.useState<"idle" | "adding">("idle");
  const [newTask, setNewTask] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(today);
  const [newTaskDate, setNewTaskDate] = React.useState(today);
  const [isPomodoroPlaying, setIsPomodoroPlaying] = React.useState(false);
  const [activeTaskId, setActiveTaskId] = React.useState<string | null>(null);

  const [tasks, setTasks] = React.useState<
    { id: string; label: string; date: string; completed: boolean }[]
  >([]);

  React.useEffect(() => {
    console.log("[LOAD] Loading tasks from localStorage...");
    const saved = localStorage.getItem("tasks");
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log("[LOAD] Parsed tasks:", parsed);
      setTasks(parsed);
    }
  }, []);

  const firstRender = React.useRef(true);
  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    console.log("[SAVE] Saving tasks to localStorage...", tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // const [tasks, setTasks] = React.useState(() => {
  //   const saved = localStorage.getItem("tasks");
  //   return saved ? JSON.parse(saved) : [];
  // });

  // React.useEffect(() => {
  //   const saved = localStorage.getItem("tasks");
  //   if (saved) {
  //     setTasks(JSON.parse(saved));
  //   }
  // }, []);

  // React.useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);

  const handleSaveTask = () => {
    if (newTask.trim() === "") return;

    const newTaskObj = {
      id: `task-${Date.now()}`,
      label: newTask.trim(),
      date: newTaskDate,
      completed: false,
    };

    setTasks((prev: any) => [...prev, newTaskObj]);
    setNewTask("");
    setMode("idle");
  };

  const handleCancel = () => {
    setNewTask("");
    setMode("idle");
  };

  const filteredTasks = tasks.filter(
    (task: any) =>
      task.date === selectedDate &&
      (selected === "pending" ? !task.completed : task.completed)
  );

  const showSection2 =
    mode === "idle" && filteredTasks.length === 0 && selected === "pending";

  const showSection3 = mode === "adding";

  const showSection4 =
    mode === "idle" && selected === "pending" && filteredTasks.length > 0;

  const showSection5 = mode === "idle";

  return (
    <div className="h-[100%] w-full grid gap-3 grid-cols-[1.2fr_3fr]">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 transition-all lg:flex-grow lg:p-0">
        {/* Section 1 (unchanged) */}
        <div className="flex justify-between gap-3 p-2 ">
          <div className="flex justify-start gap-1">
            <div
              className={`flex items-center gap-1 rounded-md px-2 cursor-pointer ${
                selected === "pending" ? "bg-zinc-800" : "hover:bg-zinc-800"
              }`}
              onClick={() => setSelected("pending")}
            >
              <Checkbox
                id="pending"
                checked={selected === "pending"}
                onCheckedChange={() => setSelected("pending")}
              />
              <Label htmlFor="pending" className="text-zinc-500">
                Pending
              </Label>
            </div>

            <div
              className={`flex items-center gap-1 rounded-md px-2 cursor-pointer ${
                selected === "completed" ? "bg-zinc-800" : "hover:bg-zinc-800"
              }`}
              onClick={() => setSelected("completed")}
            >
              <Checkbox
                id="completed"
                checked={selected === "completed"}
                onCheckedChange={() => setSelected("completed")}
              />
              <Label htmlFor="completed" className="text-zinc-700">
                Completed
              </Label>
            </div>
          </div>

          <div className="flex justify-end items-center gap-1">
            {selectedDate !== today && (
              <button
                onClick={() => setSelectedDate(today)}
                className="text-zinc-400 hover:text-zinc-200 cursor-pointer p-1"
              >
                <RotateIcon size={14} />
              </button>
            )}

            <TCalendar value={selectedDate} onChange={setSelectedDate} />

            <div className="flex items-center gap-1 text-zinc-500">
              <button
                className="hover:bg-zinc-800 p-1 rounded"
                onClick={() => {
                  const prev = new Date(selectedDate);
                  prev.setDate(prev.getDate() - 1);
                  setSelectedDate(getLocalDateString(prev));
                }}
              >
                <ChevronLeft size={16} />
              </button>

              <button
                className="hover:bg-zinc-800 p-1 rounded"
                onClick={() => {
                  const next = new Date(selectedDate);
                  next.setDate(next.getDate() + 1);
                  setSelectedDate(getLocalDateString(next));
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        {showSection2 && (
          <div className="relative flex-grow h-[calc(100%-60px)] ">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm text-zinc-600">
              <TaskIcon size={48} className="text-zinc-800" />
              <p>No {selected} tasks for this day</p>
              <button
                onClick={() => {
                  setMode("adding");
                  setNewTaskDate(selectedDate);
                }}
                className="text-zinc-500 underline underline-offset-2 hover:text-zinc-300 cursor-pointer"
              >
                Add a new task
              </button>
            </div>
          </div>
        )}

        {/* Section 5 */}
        {showSection5 &&
          filteredTasks.map((task: any) => (
            <TTaskRow
              key={task.id}
              id={task.id}
              label={task.label}
              isPlaying={activeTaskId === task.id}
              completed={task.completed}
              onPlay={(id) => {
                if (activeTaskId === id) {
                  setIsPomodoroPlaying(false);
                  setActiveTaskId(null);
                } else {
                  setActiveTaskId(id);
                  setIsPomodoroPlaying(true);
                }
              }}
              onToggleComplete={(id) => {
                setTasks((prev: any) =>
                  prev.map((t: any) =>
                    t.id === id ? { ...t, completed: !t.completed } : t
                  )
                );
                if (activeTaskId === id) {
                  setIsPomodoroPlaying(false);
                  setActiveTaskId(null);
                }
              }}
            />
          ))}

        {/* Section 3 */}
        {showSection3 && (
          <div className="flex flex-col items-start gap-3 p-3 m-2 border border-zinc-700 rounded-md my-2">
            <Input
              autoFocus
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

              <TCalendar value={newTaskDate} onChange={setNewTaskDate} />
            </div>
          </div>
        )}

        {/* Section 4 */}
        {showSection4 && (
          <div className="m-2">
            <Button
              variant={"dotted"}
              onClick={() => {
                setMode("adding");
                setNewTaskDate(selectedDate);
              }}
            >
              <PlusIcon size={18} />
              Add new Task
            </Button>
          </div>
        )}
      </div>

      <PomodoroRightLayout
        isPlaying={isPomodoroPlaying}
        activeTaskId={activeTaskId}
        onPause={() => setIsPomodoroPlaying(false)}
        onReset={() => {
          setIsPomodoroPlaying(false);
          setActiveTaskId(null);
        }}
      />
    </div>
  );
};

export default Page;

// "use client";
// import React from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import TCalendar from "@/components/shared/TCalender";
// import TaskIcon from "@/components/icons/TaskIcon";
// import Input from "@/components/ui/input";
// import BackArrowIcon from "@/components/icons/BackArrowIcon";
// import { Button } from "@/components/ui/button";
// import PlusIcon from "@/components/icons/PlusIcon";
// import getLocalDateString from "@/lib/helpers";
// import TTaskRow from "@/components/shared/TTaskRow";
// import RotateIcon from "@/components/icons/RotateIcon";
// import PomodoroRightLayout from "@/components/sections/PomodoroRightLayout";

// const today = getLocalDateString();

// const Page = () => {
//   const [selected, setSelected] = React.useState<"pending" | "completed">(
//     "pending"
//   );
//   const [mode, setMode] = React.useState<"idle" | "adding">("idle");
//   // const [showSection2, setShowSection2] = React.useState(true);
//   // const [showSection3, setShowSection3] = React.useState(false);
//   // const [showSection4, setShowSection4] = React.useState(false);
//   // const [showSection5, setShowSection5] = React.useState(false);

//   const [tasks, setTasks] = React.useState<
//     { id: string; label: string; date: string; completed: boolean }[]
//   >([]);

//   const [newTask, setNewTask] = React.useState("");
//   const [selectedDate, setSelectedDate] = React.useState(getLocalDateString());
//   const [newTaskDate, setNewTaskDate] = React.useState(getLocalDateString());
//   const [isPomodoroPlaying, setIsPomodoroPlaying] = React.useState(false);
//   const [activeTaskId, setActiveTaskId] = React.useState<string | null>(null);

//   React.useEffect(() => {
//     const storedTasks = localStorage.getItem("tasks");
//     if (storedTasks) {
//       setTasks(JSON.parse(storedTasks));
//     }
//   }, []);

//   React.useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   // React.useEffect(() => {
//   //   const todaysPending = tasks.filter(
//   //     (t) => t.date === selectedDate && !t.completed
//   //   );

//   //   const todaysCompleted = tasks.filter(
//   //     (t) => t.date === selectedDate && t.completed
//   //   );

//   //   if (selected === "pending") {
//   //     // No pending tasks
//   //     if (todaysPending.length === 0) {
//   //       setShowSection2(true);
//   //       setShowSection3(false);
//   //       setShowSection4(false);
//   //       setShowSection5(false);
//   //     } else {
//   //       setShowSection2(false);
//   //       setShowSection4(true);
//   //       setShowSection5(true);
//   //     }
//   //   }

//   //   if (selected === "completed") {
//   //     if (todaysCompleted.length === 0) {
//   //       setShowSection2(true);
//   //       setShowSection4(false);
//   //       setShowSection5(false);
//   //     } else {
//   //       setShowSection2(false);
//   //       setShowSection4(true);
//   //       setShowSection5(true);
//   //     }
//   //   }
//   // }, [selected, tasks, selectedDate]);

//   // const handleGoToToday = () => {
//   //   setSelectedDate(today);
//   // };

//   // const handleSelect = (value: "pending" | "completed") => {
//   //   if (selected !== value) setSelected(value);
//   // };

//   // const handleStartAdding = () => {
//   //   setShowSection2(false);
//   //   setShowSection3(true);
//   // };

//   const handleSaveTask = () => {
//     if (newTask.trim() === "") return;

//     const newTaskObj = {
//       id: `task-${Date.now()}`,
//       label: newTask.trim(),
//       date: newTaskDate,
//       completed: false,
//     };

//     setTasks((prev) => [...prev, newTaskObj]);
//     setNewTask("");
//     setMode("idle");
//   };

//   // const handleSaveTask = () => {
//   //   if (newTask.trim() === "") return;

//   //   const newTaskObj = {
//   //     id: `task-${Date.now()}`,
//   //     label: newTask.trim(),
//   //     date: newTaskDate,
//   //     completed: false,
//   //   };

//   //   setTasks((prev) => [...prev, newTaskObj]);
//   //   setNewTask("");
//   //   setShowSection3(false);
//   //   setShowSection2(false);
//   //   setShowSection4(true);
//   //   setShowSection5(true);
//   // };

//   const handleCancel = () => {
//     setNewTask("");
//     setMode("idle");
//   };

//   // const handleCancel = () => {
//   //   setNewTask("");
//   //   const hasPendingTasks = tasks.some(
//   //     (t) => t.date === selectedDate && !t.completed
//   //   );
//   //   if (!hasPendingTasks) {
//   //     setShowSection3(false);
//   //     setShowSection2(true);
//   //     setShowSection4(false);
//   //   } else {
//   //     setShowSection3(false);
//   //     setShowSection4(true);
//   //   }
//   // };

//   const filteredTasks = tasks.filter(
//     (task) =>
//       task.date === selectedDate &&
//       (selected === "pending" ? !task.completed : task.completed)
//   );

//   // Derived visibility (no states!)
//   const showSection2 =
//     mode === "idle" && filteredTasks.length === 0 && selected === "pending";

//   const showSection3 = mode === "adding";

//   const showSection4 =
//     mode === "idle" && selected === "pending" && filteredTasks.length > 0;

//   const showSection5 = mode === "idle";

//   // const handleAddNewClick = () => {
//   //   setShowSection3(true);
//   //   setShowSection4(false);
//   //   setNewTaskDate(selectedDate);
//   // };

//   // const handlePrevDate = () => {
//   //   const prev = new Date(selectedDate);
//   //   prev.setDate(prev.getDate() - 1);
//   //   setSelectedDate(getLocalDateString(prev));
//   // };

//   // const handleNextDate = () => {
//   //   const next = new Date(selectedDate);
//   //   next.setDate(next.getDate() + 1);
//   //   setSelectedDate(getLocalDateString(next));
//   // };

//   // const filteredTasks = tasks.filter(
//   //   (task) =>
//   //     task.date === selectedDate &&
//   //     (selected === "pending" ? !task.completed : task.completed)
//   // );

//   return (
//     <div className="h-[100%] w-full grid gap-3 grid-cols-[1.2fr_3fr]">
//       <div className="rounded-xl border border-zinc-800 bg-zinc-900 transition-all lg:flex-grow lg:p-0">
//         {/* ---------------- Section 1 ---------------- */}
//         <div className="flex justify-between gap-3 p-2 ">
//           <div className="flex justify-start gap-1">
//             <div
//               className={`flex items-center gap-1 rounded-md px-2 cursor-pointer ${
//                 selected === "pending" ? "bg-zinc-800" : "hover:bg-zinc-800"
//               }`}
//               onClick={() => handleSelect("pending")}
//             >
//               <Checkbox
//                 id="pending"
//                 checked={selected === "pending"}
//                 onCheckedChange={() => handleSelect("pending")}
//               />
//               <Label htmlFor="pending" className="text-zinc-500">
//                 Pending
//               </Label>
//             </div>
//             <div
//               className={`flex items-center gap-1 rounded-md px-2 cursor-pointer ${
//                 selected === "completed" ? "bg-zinc-800" : "hover:bg-zinc-800"
//               }`}
//               onClick={() => handleSelect("completed")}
//             >
//               <Checkbox
//                 id="completed"
//                 checked={selected === "completed"}
//                 onCheckedChange={() => handleSelect("completed")}
//               />
//               <Label htmlFor="completed" className="text-zinc-700">
//                 Completed
//               </Label>
//             </div>
//           </div>
//           <div className="flex justify-end items-center gap-1">
//             {selectedDate !== today && (
//               <button
//                 onClick={handleGoToToday}
//                 className="text-zinc-400 hover:text-zinc-200 cursor-pointer p-1"
//                 title="Go back to today"
//               >
//                 <RotateIcon size={14} />
//               </button>
//             )}
//             <TCalendar
//               value={selectedDate}
//               onChange={(date: string) => setSelectedDate(date)}
//             />

//             <div className="flex items-center gap-1 text-zinc-500">
//               <button
//                 className="hover:bg-zinc-800 p-1 rounded"
//                 onClick={handlePrevDate}
//               >
//                 <ChevronLeft size={16} />
//               </button>
//               <button
//                 className="hover:bg-zinc-800 p-1 rounded"
//                 onClick={handleNextDate}
//               >
//                 <ChevronRight size={16} />
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* ---------------- End of Section 1 ---------------- */}

//         {/* ---------------- Section 2 ---------------- */}
//         {showSection2 &&
//           filteredTasks.length === 0 &&
//           selected === "pending" && (
//             <div className="relative flex-grow h-[calc(100%-60px)] ">
//               <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm text-zinc-600">
//                 <TaskIcon size={48} className="text-zinc-800" />
//                 <p>No {selected} tasks for this day</p>
//                 <button
//                   onClick={handleStartAdding}
//                   className="text-zinc-500 underline underline-offset-2 hover:text-zinc-300 cursor-pointer"
//                 >
//                   Add a new task
//                 </button>
//               </div>
//             </div>
//           )}
//         {/* ---------------- End of Section 2 ---------------- */}

//         {/* ---------------- Section 5 ---------------- */}

//         {showSection5 &&
//           filteredTasks.map((task) => (
//             <TTaskRow
//               key={task.id}
//               id={task.id}
//               label={task.label}
//               isPlaying={activeTaskId === task.id}
//               completed={task.completed}
//               onPlay={(id) => {
//                 if (activeTaskId === id) {
//                   setIsPomodoroPlaying(false);
//                   setActiveTaskId(null);
//                 } else {
//                   setActiveTaskId(id);
//                   setIsPomodoroPlaying(true);
//                 }
//               }}
//               onToggleComplete={(id) => {
//                 setTasks((prev) =>
//                   prev.map((t) =>
//                     t.id === id ? { ...t, completed: !t.completed } : t
//                   )
//                 );

//                 if (activeTaskId === id) {
//                   setIsPomodoroPlaying(false);
//                   setActiveTaskId(null);
//                 }
//               }}
//             />
//           ))}

//         {/* ---------------- End of Section 5 ---------------- */}

//         {/* ---------------- Section 3 ---------------- */}
//         {showSection3 && (
//           <div className="flex flex-col items-start gap-3 p-3 m-2 border border-zinc-700 rounded-md my-2">
//             <Input
//               placeholder="Type and press enter to save or esc to cancel"
//               value={newTask}
//               onChange={(e) => setNewTask(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") handleSaveTask();
//                 if (e.key === "Escape") handleCancel();
//               }}
//             />
//             <div className="flex justify-between items-center text-zinc-500 text-xs w-full">
//               <div className="flex items-center justify-start gap-2 text-zinc-500">
//                 <button
//                   onClick={handleSaveTask}
//                   className="flex items-center gap-1 uppercase hover:text-zinc-200 cursor-pointer"
//                 >
//                   <span className="bg-zinc-800 px-3 rounded-md py-1 ">
//                     <BackArrowIcon size={16} />
//                   </span>
//                   <span>Save</span>
//                 </button>
//                 <button
//                   onClick={handleCancel}
//                   className="flex items-center gap-1 uppercase hover:text-zinc-200 cursor-pointer"
//                 >
//                   <span className="uppercase bg-zinc-800 px-3 py-1 rounded-md">
//                     Esc
//                   </span>
//                   <span>Cancel</span>
//                 </button>
//               </div>
//               <TCalendar
//                 value={newTaskDate}
//                 onChange={(date) => setNewTaskDate(date)}
//               />
//             </div>
//           </div>
//         )}
//         {/* ---------------- End of Section 3 ---------------- */}

//         {/* ---------------- Section 4 ---------------- */}
//         {showSection4 && selected === "pending" && filteredTasks.length > 0 && (
//           <div className="m-2">
//             <Button variant={"dotted"} onClick={handleAddNewClick}>
//               <PlusIcon size={18} />
//               Add new Task
//             </Button>
//           </div>
//         )}
//         {/* ---------------- End of Section 4 ---------------- */}
//       </div>

//       {/* Right Side */}
//       <PomodoroRightLayout
//         isPlaying={isPomodoroPlaying}
//         activeTaskId={activeTaskId}
//         onPause={() => setIsPomodoroPlaying(false)}
//         onReset={() => {
//           setIsPomodoroPlaying(false);
//           setActiveTaskId(null);
//         }}
//       />
//     </div>
//   );
// };

// export default Page;
