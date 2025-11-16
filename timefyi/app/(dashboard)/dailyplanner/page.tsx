import React from "react";

const page = () => {
  return (
    <div>
      <div className="relative flex min-h-[400px] flex-grow flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 px-4 pb-4">
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-square-check-big mb-3 flex h-[45px] w-[45px] flex-shrink-0 cursor-pointer items-center justify-center rounded-md text-zinc-800"
                    >
                      <path d="m9 11 3 3L22 4"></path>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <p>No tasks for this day</p>
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
    </div>
  );
};

export default page;
