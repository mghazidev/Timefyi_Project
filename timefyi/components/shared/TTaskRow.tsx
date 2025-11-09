"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PlayIcon from "@/components/icons/PlayIcon";
import EditIcon from "@/components/icons/EditIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { PauseIcon } from "lucide-react";

interface TTaskRowProps {
  id: string;
  label: string;
  isPlaying: boolean;
  onPlay: (id: string) => void;
}

const TTaskRow: React.FC<TTaskRowProps> = ({
  id,
  label,
  isPlaying,
  onPlay,
}) => {
  return (
    <div
      className={`group relative flex items-center justify-between cursor-pointer w-full gap-3 px-3 py-1 rounded-md text-zinc-500 hover:text-zinc-300
        ${isPlaying ? "bg-animated-stripes" : "hover:bg-zinc-800"}`}
    >
      <div className="flex items-center justify-start gap-3 z-10">
        <Checkbox id={id} className="size-4" />
        <Label htmlFor={id} className="text-sm">
          {label}
        </Label>
      </div>

      <div className="opacity-0 group-hover:opacity-100 p-2 rounded-md flex items-center gap-2 text-zinc-600 z-10">
        <button
          className="hover:text-zinc-200 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onPlay(id);
          }}
        >
          {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
        </button>
        <button className="hover:text-zinc-200 cursor-pointer">
          <EditIcon size={16} />
        </button>
        <button className="hover:text-zinc-200 cursor-pointer">
          <TrashIcon size={16} />
        </button>
      </div>
    </div>
  );
};

export default TTaskRow;
