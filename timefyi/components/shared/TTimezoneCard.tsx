"use client";
import React from "react";
import EditIcon from "../icons/EditIcon";
import TrashIcon from "../icons/TrashIcon";
import AudioWaveform from "./TWaveform";
const TTimezoneCard = () => {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div
      onClick={() => setIsActive(!isActive)}
      className={`draggable relative flex select-none flex-col justify-between overflow-hidden rounded-2xl border p-4 text-white transition-colors sm:rounded-xl sm:p-5 cursor-pointer
        ${
          isActive
            ? "border-yellow-400 shadow-[0_0_10px_rgba(255,215,0,0.4)] bg-zinc-900"
            : "border-zinc-800 bg-zinc-900/90"
        }`}
    >
      <div
        title="Central European Standard Time"
        className="drag-handle absolute bottom-0 left-0 right-0 top-0 z-[10] bg-transparent"
      ></div>
      <div className="flex items-center justify-between gap-3">
        <p className="truncate text-base text-neutral-500">Munich, Germany</p>
        <div className="z-[20] flex items-center gap-2">
          <button>
            <EditIcon size={13} className="text-zinc-500" />
          </button>
          <button>
            <TrashIcon size={13} className="text-zinc-500" />
          </button>
        </div>
      </div>
      <div className="my-2 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <p className="font-mono text-3xl ">
            <span>02</span>
            <span className="mx-0.5 font-serif">:</span>
            <span>33</span>
            <span className="ml-2 font-sans font-medium text-neutral-600">
              PM
            </span>
          </p>
          <span className="rounded-full bg-neutral-800 px-2 py-1.5 text-sm lg:text-xs xl:text-sm text-red-500">
            -4h
          </span>
        </div>
      </div>
      <div className="flex gap-1.5 text-sm text-neutral-500">
        <p>GMT+1</p>·
        <div>
          <div>
            <button
              className="z-50 cursor-pointer border-b border-dashed border-current leading-tight hover:text-neutral-300 focus:outline-none relative z-[20] cursor-pointer"
              value="Oct 28"
            >
              Oct 28
            </button>
          </div>
        </div>
      </div>
      <div>
        <AudioWaveform />
      </div>
    </div>
  );
};

export default TTimezoneCard;
