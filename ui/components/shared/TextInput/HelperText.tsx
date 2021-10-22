import React from "react";
import clsx from "clsx";

export interface HelperTextProps {
  className?: string;
  error?: boolean;
}

export const HelperText: React.FC<HelperTextProps> = (props) => {
  const { className, error, children } = props;

  return (
    <span
      className={clsx(
        "input-helper-text",
        className,
        error ? "text-red-500" : ""
      )}
    >
      {children}
    </span>
  );
};
