import clsx from "clsx";
import React from "react";

interface ToolbarGroupProps {
  endItem?: boolean;
}

export const ToolbarGroup: React.FC<ToolbarGroupProps> = (props) => {
  const { children, endItem } = props;

  return (
    <div className={clsx("flex", endItem ? "border-l ml-auto" : "border-r")}>
      {children}
    </div>
  );
};
