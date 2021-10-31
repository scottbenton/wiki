import clsx from "clsx";
import React, { HTMLAttributes } from "react";

export const SubdirectoryIcon: React.FC<HTMLAttributes<SVGSVGElement>> = (
  props
) => {
  const { className, ...svgProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="18px"
      viewBox="0 0 24 24"
      width="18px"
      className={clsx("fill-current", className)}
      {...svgProps}
    >
      <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
      <path d="M18.29 15.71l-4.58 4.58c-.39.39-1.03.39-1.42 0-.39-.39-.39-1.03 0-1.42L15.17 16H5c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1s1 .45 1 1v9h9.17l-2.88-2.87c-.39-.39-.39-1.03 0-1.42.39-.39 1.03-.39 1.42 0l4.58 4.58c.39.39.39 1.03 0 1.42z" />
    </svg>
  );
};