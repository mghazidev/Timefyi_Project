import React from "react";
import { IconBaseProps } from "../types";
const MenuIcon: React.FC<IconBaseProps> = ({
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="3" x2="21" y1="6" y2="6"></line>
      <line x1="3" x2="21" y1="12" y2="12"></line>
      <line x1="3" x2="21" y1="18" y2="18"></line>
    </svg>
  );
};

export default MenuIcon;
