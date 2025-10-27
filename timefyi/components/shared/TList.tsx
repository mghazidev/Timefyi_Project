import React, { isValidElement } from "react";
import { TCategoryCardProps } from "../types";

const TList: React.FC<TCategoryCardProps> = ({ icon, title, description }) => {
  const defaultIconProps = {
    size: 22,
    className: "text-zinc-100",
  };

  let renderedIcon = icon;

  // Check if the icon prop is a valid React element before cloning
  if (isValidElement(icon)) {
    // Clone the icon element and inject the default style props
    // Existing props on the icon will be merged, with defaultIconProps overriding
    renderedIcon = React.cloneElement(icon, defaultIconProps);
  }

  return (
    <div className="flex  gap-4 max-w-[full] py-3 px-4 rounded-md">
      <div className="mt-1">{renderedIcon}</div>
      <div className="flex flex-col gap-1">
        <h1 className="text-zinc-100 font-medium text-lg  tracking-wide">
          {title}
        </h1>
        <p className="text-zinc-500 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default TList;
