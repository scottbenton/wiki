import clsx from "clsx";
import React from "react";
import { Tooltip } from "../Tooltip";

export interface ToolbarButtonProps {
  className?: string;
  onClick: () => void;
  isActive?: boolean;
  title: string;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = (props) => {
  const { children, className, onClick, isActive, title } = props;

  return (
    <Tooltip content={title}>
      <button
        className={clsx(
          className,
          isActive ? "bg-gray-200" : "",
          "btn px-2 hover:bg-gray-200 rounded-none text-gray-700"
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </Tooltip>
  );
};
