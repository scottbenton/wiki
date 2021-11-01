import React from "react";

interface DesktopSidebarHandleProps {
  setIsHovering: (isHovering: boolean) => void;
}

export const DesktopSidebarHandle: React.FC<DesktopSidebarHandleProps> = (
  props
) => {
  const { setIsHovering } = props;

  return (
    <div
      className={"h-full"}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsHovering(true)}
      onBlur={() => setIsHovering(false)}
    ></div>
  );
};
