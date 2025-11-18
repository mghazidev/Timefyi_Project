import TaskIcon from "../icons/TaskIcon";
const DailyPlannerTaskSection = () => {
  return (
    <div className="relative flex min-h-[100%] flex-grow flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 px-4 pb-4">
      <h3 className="flex justify-between py-4 text-xs uppercase tracking-[0.15em] text-zinc-500">
        <span className="hidden sm:inline">Friday, 14 November</span>
        <span className="inline sm:hidden">Fri, 14 Nov</span>
      </h3>
      <div className="relative -mx-3 flex flex-grow flex-col">
        <div className="custom-scrollbar relative flex flex-grow flex-col overflow-y-scroll">
          <div className="absolute inset-0 flex flex-col gap-5 px-3">
            <div className="flex-grow pb-10">
              <div
                id="planned-tasks-2025-11-14T00:00:00.000+05:00"
                data-date="2025-11-14"
              >
                <div className="absolute inset-0 flex flex-1 flex-grow flex-col items-center justify-center gap-1 text-sm text-zinc-600">
                  <TaskIcon size={36} className="mb-3" />
                  <p className="mb-1.5 text-lg text-zinc-400">
                    No tasks for this day
                  </p>
                  <p>
                    <button className="text-zinc-500 underline underline-offset-2 hover:text-zinc-300">
                      Add a new task
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyPlannerTaskSection;
