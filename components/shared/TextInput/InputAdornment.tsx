import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export interface InputAdornmentProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  side?: "start" | "end";
}

export const InputAdornment: React.FC<InputAdornmentProps> = (props) => {
  const { children, className, id, side = "end", ...buttonProps } = props;
  const { onClick } = props;

  const classes = clsx(
    className,
    "px-3 h-full bg-gray-200 focus:outline-none text-gray-700 fill-current flex items-center",
    side === "start" ? "pl-4" : "pr-4"
  );

  const descriptiveId = id + (onClick ? "-button" : "-container");

  if (onClick) {
    return (
      <button
        className={clsx(classes, "hover:bg-gray-400")}
        type={"button"}
        id={descriptiveId}
        data-testid={descriptiveId}
        {...buttonProps}
      >
        {children}
      </button>
    );
  } else {
    return (
      <div data-testid={descriptiveId} id={descriptiveId} className={classes}>
        {children}
      </div>
    );
  }
};
