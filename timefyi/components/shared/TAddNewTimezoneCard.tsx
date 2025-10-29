"use client";
import React from "react";
import PlusIcon from "../icons/PlusIcon";
import CrossIcon from "../icons/CrossIcon";
import GlobeIcon from "../icons/GlobeIcon";
const TAddNewTimezoneCard = () => {
  const [isSearchMode, setIsSearchMode] = React.useState(false);

  return (
    <button
      onClick={() => !isSearchMode && setIsSearchMode(true)}
      className=" relative flex w-full cursor-pointer min-h-[220px] flex-col items-center justify-center rounded-2xl border-dashed border-neutral-500 bg-neutral-900/60 p-4 text-neutral-500 transition-colors hover:border-neutral-400 hover:bg-neutral-900/80 hover:text-neutral-300 sm:min-h-[217px]"
    >
      {!isSearchMode && (
        <>
          <PlusIcon size={28} />
          <p className="mt-1">Add Timezone</p>
        </>
      )}

      {isSearchMode && (
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <GlobeIcon size={18} className="text-zinc-500" />

          <div className="flex-1 mx-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Timezone, city, or country"
                className="w-full text-base text-zinc-200   
                outline-none placeholder-zinc-500"
                autoFocus
              />
            </div>
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsSearchMode(false);
            }}
            className="p-1 text-zinc-500 hover:text-zinc-200 transition cursor-pointer"
          >
            <CrossIcon size={18} />
          </div>
        </div>
      )}
    </button>
  );
};

export default TAddNewTimezoneCard;
