import React from "react";
import { Menu as HeadlessMenu } from "@headlessui/react";
import clsx from "clsx";

export interface MenuProps {
  className?: string;
}

export const Menu: React.FC<MenuProps> = (props) => {
  const { className, children } = props;

  return (
    <HeadlessMenu as={"div"} className={clsx(className, "relative")}>
      {children}
    </HeadlessMenu>
  );
};
