"use client";
import React from "react";
import ReverseIcon from "../icons/ReverseIcon";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";

const daysArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dates = Array.from({ length: 28 }, (_, i) => i + 1);

const RoutineSection = () => {
  const [selectedTab, setSelectedTab] = React.useState<
    "daily" | "weekly" | "bi-weekly" | "monthly"
  >("daily");

  const [routineText, setRoutineText] = React.useState("");
  const [selectedDays, setSelectedDays] = React.useState<string[]>([]);
  const [selectedDates, setSelectedDates] = React.useState<number[]>([]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleDate = (date: number) => {
    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  const handleCreateRoutine = () => {
    if (!routineText.trim()) return;

    const newRoutine = {
      id: crypto.randomUUID(),
      label: routineText,
      type: "routine",
      completed: false,
      completedDates: [],
      routine: {
        frequency: selectedTab,
        days:
          selectedTab === "weekly" || selectedTab === "bi-weekly"
            ? selectedDays
            : undefined,
        dates: selectedTab === "monthly" ? selectedDates : undefined,
      },
    };

    // SAVE TO LOCAL STORAGE (inside tasks array)
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tasks");
      const parsed = saved ? JSON.parse(saved) : [];
      const updated = [...parsed, newRoutine];
      localStorage.setItem("tasks", JSON.stringify(updated));
    }

    // Reset UI
    setRoutineText("");
    setSelectedDays([]);
    setSelectedDates([]);
  };

  const tabBtn = (tab: string, label: string) => (
    <button
      onClick={() => setSelectedTab(tab as any)}
      className={`py-1 px-3 rounded-sm cursor-pointer ${
        selectedTab === tab
          ? "bg-zinc-700 text-zinc-300"
          : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="relative flex min-h-[100%] flex-grow flex-col justify-center items-center rounded-2xl border border-zinc-800 bg-zinc-900 px-4 pb-4">
      <ReverseIcon size={48} className="text-zinc-800 mb-3" />
      <h2 className="mb-1.5 text-lg text-zinc-400">No routines found</h2>
      <p className="mb-4 text-zinc-600">
        Tasks that automatically get added to your daily to-do list
      </p>

      <Dialog>
        <DialogTrigger asChild>
          <button className="text-base text-zinc-500 underline underline-offset-2 hover:text-zinc-300 cursor-pointer">
            Add a new Routine
          </button>
        </DialogTrigger>

        <DialogContent className="bg-zinc-900 border-zinc-800 max-w-[360px] px-3">
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
              value={routineText}
              onChange={(e) => setRoutineText(e.target.value)}
            />

            <Label className="mt-2 text-sm text-zinc-400">
              Select the routine frequency
            </Label>
            <div className="flex gap-2 text-sm text-zinc-500">
              {tabBtn("daily", "Daily")}
              {tabBtn("weekly", "Weekly")}
              {tabBtn("bi-weekly", "Bi-Weekly")}
              {tabBtn("monthly", "Monthly")}
            </div>

            {(selectedTab === "weekly" || selectedTab === "bi-weekly") && (
              <>
                <Label className="mt-2 text-sm text-zinc-400">
                  Select week days
                </Label>
                <div className="grid grid-cols-3 gap-2 text-sm text-zinc-500">
                  {daysArray.map((day) => (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`py-1 px-3 rounded-sm cursor-pointer ${
                        selectedDays.includes(day)
                          ? "bg-zinc-700 text-zinc-300"
                          : "bg-zinc-800 hover:bg-zinc-700"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </>
            )}

            {selectedTab === "monthly" && (
              <>
                <Label className="mt-2 text-sm text-zinc-400">
                  Select the dates
                </Label>
                <div className="grid grid-cols-6 gap-2 text-sm text-zinc-500">
                  {dates.map((d) => (
                    <button
                      key={d}
                      onClick={() => toggleDate(d)}
                      className={`py-1 px-2 rounded-sm cursor-pointer ${
                        selectedDates.includes(d)
                          ? "bg-zinc-700 text-zinc-300"
                          : "bg-zinc-800 hover:bg-zinc-700"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={handleCreateRoutine}
              className="bg-zinc-600 text-zinc-300 w-full hover:bg-zinc-500"
            >
              Create Routine
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoutineSection;

// "use client";
// import React from "react";
// import ReverseIcon from "../icons/ReverseIcon";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Label } from "../ui/label";

// const daysArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// const dates = Array.from({ length: 28 }, (_, i) => i + 1);

// const RoutineSection = () => {
//   const [selectedTab, setSelectedTab] = React.useState<
//     "daily" | "weekly" | "bi-weekly" | "monthly"
//   >("daily");

//   const [routineText, setRoutineText] = React.useState("");
//   const [selectedDays, setSelectedDays] = React.useState<string[]>([]);
//   const [selectedDates, setSelectedDates] = React.useState<number[]>([]);

//   const toggleDay = (day: string) => {
//     setSelectedDays((prev) =>
//       prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
//     );
//   };

//   const toggleDate = (date: number) => {
//     setSelectedDates((prev) =>
//       prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
//     );
//   };

//   const handleCreateRoutine = () => {
//     if (!routineText.trim()) return;

//     const newRoutine = {
//       id: crypto.randomUUID(),
//       label: routineText,
//       type: "routine",
//       completed: false,
//       completedDates: [],
//       routine: {
//         frequency: selectedTab,
//         days:
//           selectedTab === "weekly" || selectedTab === "bi-weekly"
//             ? selectedDays
//             : undefined,
//         dates: selectedTab === "monthly" ? selectedDates : undefined,
//       },
//     };

//     if (typeof window !== "undefined") {
//       const saved = localStorage.getItem("tasks");
//       const parsed = saved ? JSON.parse(saved) : [];
//       const updated = [...parsed, newRoutine];
//       localStorage.setItem("tasks", JSON.stringify(updated));
//     }

//     setRoutineText("");
//     setSelectedDays([]);
//     setSelectedDates([]);
//   };

//   // const toggleButtonClasses = (tab: any) =>
//   //   `py-1 px-3 rounded-sm cursor-pointer ${
//   //     selectedTab === tab
//   //       ? "bg-zinc-700 text-zinc-300"
//   //       : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"
//   //   }`;

//   const tabBtn = (tab: string, label: string) => (
//     <button
//       onClick={() => setSelectedTab(tab as any)}
//       className={`py-1 px-3 rounded-sm cursor-pointer ${
//         selectedTab === tab
//           ? "bg-zinc-700 text-zinc-300"
//           : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"
//       }`}
//     >
//       {label}
//     </button>
//   );

//   return (
//     <div className="relative flex min-h-[100%] flex-grow flex-col justify-center items-center rounded-2xl border border-zinc-800 bg-zinc-900 px-4 pb-4">
//       <ReverseIcon size={48} className="text-zinc-800 mb-3" />
//       <h2 className="mb-1.5 text-lg text-zinc-400">No routines found</h2>
//       <p className="mb-4 text-zinc-600">
//         Tasks that automatically get added to your daily to-do list
//       </p>

//       <Dialog>
//         <DialogTrigger asChild>
//           <button className="text-base text-zinc-500 underline underline-offset-2 hover:text-zinc-300 cursor-pointer">
//             Add a new Routine
//           </button>
//         </DialogTrigger>

//         <DialogContent className="bg-zinc-900 border-zinc-800 w-full max-w-[260px] w-[360px] px-3">
//           <DialogHeader>
//             <DialogTitle />
//           </DialogHeader>

//           <div className="mt-4 flex flex-col gap-2">
//             <Label className="text-sm text-zinc-400">
//               Enter the routine task
//             </Label>
//             <input
//               className="w-full p-2 rounded-md bg-zinc-800 text-sm text-zinc-300 outline-none placeholder-zinc-500"
//               placeholder="Routine task"
//               value={routineText}
//               onChange={(e) => setRoutineText(e.target.value)}
//             />
//             <Label className="mt-2 text-sm text-zinc-400">
//               Select the routine frequency
//             </Label>
//             <div className="flex gap-2 justify-start text-sm text-zinc-500">
//               {tabBtn("daily", "Daily")}
//               {tabBtn("weekly", "Weekly")}
//               {tabBtn("bi-weekly", "Bi-Weekly")}
//               {tabBtn("monthly", "Monthly")}
//             </div>

//             {(selectedTab === "weekly" || selectedTab === "bi-weekly") && (
//               <>
//                 <Label className="mt-2 text-sm text-zinc-400">
//                   Select the week days
//                 </Label>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-zinc-500 text-sm">
//                   {daysArray.map((day) => (
//                     <button
//                       key={day}
//                       onClick={() => toggleDay(day)}
//                       className={`py-1 px-3 rounded-sm cursor-pointer ${
//                         selectedDays.includes(day)
//                           ? "bg-zinc-700 text-zinc-300"
//                           : "bg-zinc-800 hover:bg-zinc-700"
//                       }`}
//                     >
//                       {day}
//                     </button>
//                   ))}
//                 </div>
//               </>
//             )}

//             {selectedTab === "monthly" && (
//               <>
//                 <Label className="mt-2 text-sm text-zinc-400">
//                   Select the dates
//                 </Label>
//                 <div className="grid grid-cols-6 gap-2 text-sm text-zinc-500">
//                   {dates.map((d) => (
//                     <button
//                       key={d}
//                       onClick={() => toggleDate(d)}
//                       className={`py-1 px-2 rounded-sm cursor-pointer ${
//                         selectedDates.includes(d)
//                           ? "bg-zinc-700 text-zinc-300"
//                           : "bg-zinc-800 hover:bg-zinc-700"
//                       }`}
//                     >
//                       {d}
//                     </button>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>

//           <DialogFooter>
//             <Button
//               onClick={handleCreateRoutine}
//               className="bg-zinc-600 text-zinc-300 font-normal w-full hover:bg-zinc-500"
//             >
//               Create Routine
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default RoutineSection;
