import { Menu } from "@headlessui/react";
import React from "react";
import { Button, ButtonProps } from "../Button";

export interface MenuButtonProps extends ButtonProps {}

export const MenuButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  MenuButtonProps
>((props, ref) => {
  const { children, ...buttonProps } = props;

  return (
    <Menu.Button ref={ref} as={Button} {...buttonProps}>
      {children}
    </Menu.Button>
  );
});
