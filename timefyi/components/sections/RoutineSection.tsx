import ReverseIcon from "../icons/ReverseIcon";

const RoutineSection = () => {
  return (
    <div className="relative flex min-h-[100%] flex-grow flex-col justify-center items-center rounded-2xl border border-zinc-800 bg-zinc-900 px-4 pb-4">
      <ReverseIcon size={48} className="text-zinc-800 mb-3" />
      <h2 className="mb-1.5 text-lg text-zinc-400">No routines found</h2>
      <p className="mb-4 text-zinc-600">
        Tasks that automatically get added to your daily to-do list
      </p>
      <button className="text-base text-zinc-500 underline underline-offset-2 hover:text-zinc-300">
        Add a new Routine
      </button>
    </div>
  );
};

export default RoutineSection;
