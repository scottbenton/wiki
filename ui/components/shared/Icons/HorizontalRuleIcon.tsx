import clsx from "clsx";
import React, { HTMLAttributes } from "react";

export const HorizontalRuleIcon: React.FC<HTMLAttributes<SVGSVGElement>> = (
  props
) => {
  const { className, ...svgProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="18px"
      viewBox="0 0 20 20"
      width="18px"
      className={clsx("fill-current", className)}
      {...svgProps}
    >
      <g>
        <rect fill="none" height="20" width="20" />
        <path d="M16,11H4c-0.55,0-1-0.45-1-1v0c0-0.55,0.45-1,1-1h12c0.55,0,1,0.45,1,1v0C17,10.55,16.55,11,16,11z" />
      </g>
    </svg>
  );
};
