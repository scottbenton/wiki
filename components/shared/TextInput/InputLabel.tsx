import React from "react";
import clsx from "clsx";

export interface InputLabelProps {
  error?: boolean;
  htmlFor?: string;
  className?: string;
}

export const InputLabel: React.FC<InputLabelProps> = (props) => {
  const { children, error, htmlFor, className } = props;
  const classes = clsx("input-label", error && "text-red-700", className);

  if (htmlFor) {
    return (
      <label className={classes} htmlFor={htmlFor}>
        {children}
      </label>
    );
  } else {
    return <span className={classes}>{children}</span>;
  }
};
