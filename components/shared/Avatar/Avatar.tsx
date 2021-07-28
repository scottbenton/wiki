import clsx from "clsx";
import React from "react";

export interface AvatarProps {
  className?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { className, children, backgroundColor, textColor } = props;

  return (
    <div
      className={clsx(
        "rounded-full w-10 h-10 flex items-center justify-center text-md font-bold tracking-wider overflow-hidden flex-shrink-0",
        className
      )}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      {children}
    </div>
  );
};
