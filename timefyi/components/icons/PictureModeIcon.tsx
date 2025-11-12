import React from "react";
import { IconBaseProps } from "../types";
const PictureModeIcon: React.FC<IconBaseProps> = ({ size = 48, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4"></path>
      <rect width="10" height="7" x="12" y="13" rx="2"></rect>
    </svg>
  );
};

export default PictureModeIcon;
