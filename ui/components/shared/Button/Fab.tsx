import clsx from "clsx";
import React from "react";
import { Button, ButtonProps } from "./Button";

export interface FabProps extends Omit<ButtonProps, "variant"> {}

export const Fab: React.FC<FabProps> = (props) => {
  const { className, ...buttonProps } = props;

  return (
    <Button
      className={clsx(
        className,
        "fixed bottom-4 right-4 rounded-full shadow-xl py-3 text-md"
      )}
      variant={"contained"}
      {...buttonProps}
    />
  );
};
