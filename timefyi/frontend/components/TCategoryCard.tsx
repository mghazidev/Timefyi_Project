import React from "react";
import { TCategoryCardProps } from "./types";

const TCategoryCard: React.FC<TCategoryCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-zinc-900 hover:bg-zinc-800 cursor-pointer max-w-full rounded-md p-6 text-center">
      <div className="flex flex-col gap-2 items-center justify-between">
        {icon}
        <h1 className="mt-2 text-zinc-50 font-medium">{title}</h1>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>
    </div>
  );
};

export default TCategoryCard;
