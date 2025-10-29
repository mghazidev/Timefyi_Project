"use client";
import TTimezoneCard from "@/components/shared/TTimezoneCard";
import TAddNewTimezoneCard from "@/components/shared/TAddNewTimezoneCard";
import { Slider } from "@/components/ui/slider";
const page = () => {
  return (
    <div>
      {/* <div
        className="
        grid 
        gap-3 
        overscroll-contain 
        grid-cols-[repeat(auto-fill,minmax(300px,1fr))] 
        justify-items-center
      "
      >
        <TTimezoneCard />
        <TTimezoneCard />

        <TAddNewTimezoneCard />
      </div>
       */}
      <div className="h-screen w-full grid gap-3 grid-cols-[2.5fr_1fr]">
        <div className="relative flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 py-14 transition-all lg:flex-grow lg:p-5">
          <div className="flex flex-col items-center justify-center">
            <h2 className="mb-1 flex items-center justify-center text-base text-gray-400 lg:mb-2 lg:text-xl">
              Munich, Germany
            </h2>
            <p className="my-2.5 font-mono text-5xl font-semibold  md:text-7xl lg:text-9xl">
              <span className="">10</span>
              <span className="mx-0.5 font-serif font-medium">:</span>
              <span className="">31</span>
              <span className="ml-2 font-sans text-2xl font-medium text-neutral-600">
                PM
              </span>
            </p>
            <div>
              <p className="mt-1 border-b border-dashed border-zinc-700 pb-0.5 text-base text-gray-400 transition-colors hover:text-gray-300 hover:border-zinc-500 lg:mt-2 lg:text-xl relative z-[20] cursor-pointer">
                Wednesday - October 29, 2025
              </p>
            </div>
            <div className="w-full flex justify-center mt-4">
              <Slider
                defaultValue={[10]}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="bg-zinc-400 rounded-2xl border border-zinc-800 p-3"></div>
      </div>
    </div>
  );
};

export default page;
