import React from "react";
import clsx from "clsx";

export interface InputBoxProps {
  error?: boolean;
  focused?: boolean;
}

export const InputBox: React.FC<InputBoxProps> = (props) => {
  const { children, error, focused } = props;

  return (
    <div
      className={clsx(
        "input-box",
        focused
          ? error
            ? "border-red-700"
            : "border-primary-700"
          : error
          ? "border-red-500"
          : "border-gray-500"
      )}
    >
      {children}
    </div>
  );
};
