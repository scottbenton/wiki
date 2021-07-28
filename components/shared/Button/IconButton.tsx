import clsx from "clsx";
import React from "react";
import { ButtonProps, Button } from "./Button";

export interface IconButtonProps extends ButtonProps {
  square?: boolean;
  small?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const { className, square, small, ...buttonProps } = props;

  return (
    <Button
      {...buttonProps}
      className={clsx(
        "flex-shrink-0",
        square ? "rounded-lg" : "rounded-full",
        small ? "p-1" : "p-2",
        className
      )}
    />
  );
};
