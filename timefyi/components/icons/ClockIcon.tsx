import React from "react";
import { IconBaseProps } from "../types";

const ClockIcon: React.FC<IconBaseProps> = ({
  size = 48,
  color = "currentColor",
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      height={size}
      width={size}
      className={className}
    >
      <path
        d="M24 0a24 24 0 1 0 24 24A24 24 0 0 0 24 0Zm0 41a2.5 2.5 0 1 1 2.5 -2.5A2.5 2.5 0 0 1 24 41Zm0 -15a2 2 0 0 1 -1.42 -0.58l-6 -6a2 2 0 0 1 2.84 -2.84l5.4 5.42H38a2 2 0 0 1 0 4Zm-12 -2a2.5 2.5 0 1 1 -2.5 -2.5A2.5 2.5 0 0 1 12 24Zm12 -17a2.5 2.5 0 1 1 -2.5 2.5A2.5 2.5 0 0 1 24 7Z"
        fill={color}
      ></path>
    </svg>
  );
};

export default ClockIcon;
