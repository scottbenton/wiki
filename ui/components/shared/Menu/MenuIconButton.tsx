import { Menu } from "@headlessui/react";
import React, { forwardRef } from "react";
import { IconButton, IconButtonProps } from "../Button";

export interface MenuIconButtonProps extends IconButtonProps {}

export const MenuIconButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  MenuIconButtonProps
>((props, ref) => {
  const { children, ...iconButtonProps } = props;

  return (
    <Menu.Button ref={ref} as={IconButton} {...iconButtonProps}>
      {children}
    </Menu.Button>
  );
});
