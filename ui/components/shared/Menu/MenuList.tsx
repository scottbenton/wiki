import React from "react";
import { Menu } from "@headlessui/react";
import { Card } from "../Card";
import clsx from "clsx";

export interface MenuListProps {
  className?: string;
}

export const MenuList: React.FC<MenuListProps> = (props) => {
  const { className, children } = props;

  return (
    <Menu.Items as={"div"} className={clsx("right-0 py-2 absolute", className)}>
      <Card className={"border w-full max-w-xs shadow-lg py-2"}>
        {children}
      </Card>
    </Menu.Items>
  );
};
