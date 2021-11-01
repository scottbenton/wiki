import React from "react";
import clsx from "clsx";
import { SidebarContent } from "../SidebarContent";

export interface MobileSidebarProps {
  open: boolean;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = (props) => {
  const { open } = props;

  return (
    <div
      className={clsx(
        "bg-gray-200 absolute z-40 sm:static shadow-lg w-full  transition-all transform duration-300 ease-in-out h-full py-2 overflow-x-auto",
        open
          ? "translate-x-0 w-full px-1 sm:w-1/4"
          : "-translate-x-full w-0 px-0"
      )}
    >
      <SidebarContent />
    </div>
  );
};
