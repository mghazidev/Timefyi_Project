"use client";
import TTimezoneCard from "@/components/shared/TTimezoneCard";
import TAddNewTimezoneCard from "@/components/shared/TAddNewTimezoneCard";
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
      <div className="h-screen w-full grid gap-3 grid-cols-[2fr_1fr]">
        <div className="bg-zinc-900 rounded-md border border-zinc-800 p-6"></div>
        <div className="bg-zinc-900 rounded-md border border-zinc-800 p-6"></div>
      </div>
    </div>
  );
};

export default page;
