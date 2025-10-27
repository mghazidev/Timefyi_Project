import React from "react";
import { IconBaseProps } from "../types";

const DailyPlannerIcon: React.FC<IconBaseProps> = ({
  size = 48,
  color = "currentColor",
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      id="Calendar-Check--Streamline-Ultimate"
      height={size}
      width={size}
      className={className}
    >
      <g>
        <path
          d="M43 6h-5.5a0.5 0.5 0 0 1 -0.5 -0.5V2a2 2 0 0 0 -4 0v9.5a1.5 1.5 0 0 1 -3 0V7a1 1 0 0 0 -1 -1H16.5A0.5 0.5 0 0 1 16 5.5V2a2 2 0 0 0 -4 0v9.5a1.5 1.5 0 0 1 -3 0V7A1 1 0 0 0 8 6H5a4 4 0 0 0 -4 4v34a4 4 0 0 0 4 4h38a4 4 0 0 0 4 -4V10a4 4 0 0 0 -4 -4Zm0 37a1 1 0 0 1 -1 1H6a1 1 0 0 1 -1 -1v-24A1 1 0 0 1 6 18h36a1 1 0 0 1 1 1Z"
          fill={color}
        ></path>
        <path
          d="M24 21a10 10 0 1 0 10 10 10 10 0 0 0 -10 -10Zm5.66 8 -4.84 6.44a2.76 2.76 0 0 1 -4.16 0.3l-2.5 -2.5a1.5 1.5 0 1 1 2.12 -2.12l2.3 2.3 4.68 -6.22a1.5 1.5 0 0 1 2.4 1.8Z"
          fill={color}
        ></path>
      </g>
    </svg>
  );
};

export default DailyPlannerIcon;
