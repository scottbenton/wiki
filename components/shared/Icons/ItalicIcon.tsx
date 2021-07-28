import clsx from "clsx";
import React, { HTMLAttributes } from "react";

export const ItalicIcon: React.FC<HTMLAttributes<SVGSVGElement>> = (props) => {
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
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M10 5.5c0 .83.67 1.5 1.5 1.5h.71l-3.42 8H7.5c-.83 0-1.5.67-1.5 1.5S6.67 18 7.5 18h5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-.71l3.42-8h1.29c.83 0 1.5-.67 1.5-1.5S17.33 4 16.5 4h-5c-.83 0-1.5.67-1.5 1.5z" />
    </svg>
  );
};
