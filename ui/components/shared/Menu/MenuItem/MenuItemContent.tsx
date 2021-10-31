import { Icon } from "components/shared/Icons";
import React from "react";
import clsx from "clsx";

export interface MenuItemContentProps {
  primaryText: string;
  secondaryText?: string;
  Icon?: Icon;
  inset?: boolean;
}

export const MenuItemContent: React.FC<MenuItemContentProps> = (props) => {
  const { primaryText, secondaryText, Icon, inset } = props;

  return (
    <>
      {Icon && <Icon className={"flex-shrink-0 w-5 h-5 text-gray-500"} />}
      {!Icon && inset && <div className={"flex-shrink-0 w-5 h-5"} />}

      <div className={clsx("flex-grow", inset || Icon ? "pl-3" : "")}>
        <p className={"text-gray-800 leading-tight whitespace-nowrap"}>
          {primaryText}
        </p>
        <p className={"text-gray-700"}>{secondaryText}</p>
      </div>
    </>
  );
};
