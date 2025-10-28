import React from "react";
import { IconBaseProps } from "../types";

const MusicIcon: React.FC<IconBaseProps> = ({
  size = 48,
  color = "currentColor",
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
    >
      <circle cx="8" cy="18" r="4"></circle>
      <path d="M12 18V2l7 4"></path>
    </svg>
  );
};

export default MusicIcon;
