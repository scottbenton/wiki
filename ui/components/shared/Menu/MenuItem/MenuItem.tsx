import React from "react";
import { Menu } from "@headlessui/react";
import clsx from "clsx";
import { MenuItemContent, MenuItemContentProps } from "./MenuItemContent";

export interface MenuItemProps extends MenuItemContentProps {
  href?: string;
  onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { href, onClick, ...menuItemContentProps } = props;

  return (
    <Menu.Item>
      {({ active }) =>
        href ? (
          <a
            className={clsx(
              "p-3 hover:bg-gray-100 flex items-center text-left w-full",
              active ? "bg-gray-200" : ""
            )}
            href={href}
          >
            <MenuItemContent {...menuItemContentProps} />
          </a>
        ) : (
          <button
            className={clsx(
              "p-3 hover:bg-gray-100 flex items-center text-left w-full",
              active ? "bg-gray-200" : ""
            )}
            onClick={onClick}
          >
            <MenuItemContent {...menuItemContentProps} />
          </button>
        )
      }
    </Menu.Item>
  );
};
