import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TCalendar from "@/components/shared/TCalender";

const page = () => {
  return (
    <div className="h-[100%] w-full grid gap-3 grid-cols-[1.2fr_3fr]">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 transition-all lg:flex-grow lg:p-2">
        <div className="flex justify-between gap-3 p-2">
          <div className="flex justify-start gap-3">
            <div className="flex items-center gap-1">
              <Checkbox id="pending" />
              <Label htmlFor="pending" className="text-zinc-500">
                Pending
              </Label>
            </div>
            <div className="flex items-center gap-1">
              <Checkbox id="completed" />
              <Label htmlFor="completed" className="text-zinc-500">
                Completed
              </Label>
            </div>
          </div>
          <div className="flex justify-end items-center gap-1">
            <TCalendar />
            <div className="flex items-center gap-1 text-zinc-500">
              <div className="hover:bg-zinc-800 p-1 rounded-md">
                <ChevronLeft size={16} />
              </div>
              <div className="hover:bg-zinc-800 p-1 rounded-md">
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800"></div>
    </div>
  );
};

export default page;
