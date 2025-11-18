"use client";

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

const RoutineSection = () => {
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

        <DialogContent className="bg-zinc-900 p-3 border-none text-zinc-200">
          <DialogHeader></DialogHeader>

          <div className="mt-4">
            <Label>Enter the routine task</Label>
            <input
              className="w-full p-2 rounded-md bg-zinc-800 text-zinc-200 outline-none placeholder-zinc-500"
              placeholder="Routine name..."
            />
          </div>

          <DialogFooter className="mt-6">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
              Save Routine
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoutineSection;
