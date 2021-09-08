import clsx from "clsx";
import React from "react";
import { Tooltip } from "../Tooltip";
import { ButtonProps, Button } from "./Button";

export interface IconButtonProps extends ButtonProps {
  square?: boolean;
  small?: boolean;
  title: string;
}

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const { className, square, small, title, ...buttonProps } = props;

  return (
    <Tooltip content={title}>
      <Button
        aria-label={title}
        {...buttonProps}
        className={clsx(
          "flex-shrink-0",
          square ? "rounded-lg" : "rounded-full",
          small ? "p-1" : "p-2",
          className
        )}
      />
    </Tooltip>
  );
};
