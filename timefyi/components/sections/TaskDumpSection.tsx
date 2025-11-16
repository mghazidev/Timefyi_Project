import { ListTodo } from "lucide-react";
import Input from "../ui/input";
import EnterIcon from "../icons/EnterIcon";

const TaskDumpSection = () => {
  return (
    <div className="relative flex min-h-[100%] flex-col justify-center items-center rounded-2xl border border-zinc-800 bg-zinc-900 p-4 overflow-hidden">
      <div className="flex justify-center my-6 w-full">
        <div className="relative w-[700px]">
          <Input
            placeholder="Enter a task and press enter"
            className="px-3 py-2 pr-22 rounded-md bg-zinc-800 w-full"
          />
          <button className="absolute flex gap-1 uppercase items-end right-3 top-1/2 -translate-y-1/2 text-xs px-3 py-1 bg-transparent text-zinc-500 rounded-md hover:bg-zinc-700 cursor-pointer">
            <EnterIcon size={16} className="text-zinc-500" />
            Save
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-grow items-center justify-center text-center">
        <ListTodo size={48} className="text-zinc-800 mb-3" />
        <h2 className="mb-1.5 text-lg text-zinc-400">Start adding tasks</h2>
        <p className="mb-4 text-zinc-600">
          Dump your tasks here and organize them later.
        </p>
      </div>
    </div>
  );
};

export default TaskDumpSection;
