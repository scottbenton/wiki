import clsx from "clsx";
import React from "react";

export interface ToolbarButtonProps {
  className?: string;
  onClick: () => void;
  isActive?: boolean;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = (props) => {
  const { children, className, onClick, isActive } = props;

  return (
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
  );
};
