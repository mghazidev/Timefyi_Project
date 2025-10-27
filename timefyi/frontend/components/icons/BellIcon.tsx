import React from "react";
import { IconBaseProps } from "../types";

const BellIcon: React.FC<IconBaseProps> = ({
  size = 48,
  color = "currentColor",
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      id="Alarm-Bell--Streamline-Ultimate"
      height={size}
      width={size}
      className={className}
    >
      <g>
        <path
          d="M42 35a3 3 0 0 1 -3 -3v-9.72A16 16 0 0 0 26 6.14V2a2 2 0 0 0 -4 0v4.14a16 16 0 0 0 -13 16.14V32A3 3 0 0 1 6 35a2 2 0 0 0 0 4h36a2 2 0 0 0 0 -4Z"
          fill={color}
        ></path>
        <path
          d="M28.48 42H19.52a0.5 0.5 0 0 0 -0.48 0.44 5.28 5.28 0 0 0 0 0.56 5 5 0 0 0 10 0 5.28 5.28 0 0 0 0 -0.56 0.5 0.5 0 0 0 -0.56 -0.44Z"
          fill={color}
        ></path>
      </g>
    </svg>
  );
};

export default BellIcon;
