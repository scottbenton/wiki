import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SidebarItemProps } from "./SidebarItem";
import Link from "next/link";
import { IconButton } from "components/shared/Button";
import CollapseIcon from "@heroicons/react/solid/ChevronRightIcon";

export const MobileSidebarItem: React.FC<SidebarItemProps> = (props) => {
  const {
    name,
    href,
    level,
    collapsed,
    handleCollapse,
    hasCollapseContent,
    hoverAction,
    IconSlot,
  } = props;

  const router = useRouter();
  const isSelected = router.asPath === href;

  const Wrapper: React.FC = ({ children }) => {
    if (href) {
      return <Link href={href}>{children}</Link>;
    } else {
      return <>{children}</>;
    }
  };

  const showCollapsableArrowButton =
    typeof collapsed === "boolean" && handleCollapse && hasCollapseContent;
  const showCollapsableNoContentDot =
    typeof collapsed === "boolean" && !hasCollapseContent;

  const { Icon: HoverIcon } = hoverAction || {};

  return (
    <div
      className={clsx(
        "flex text-gray-700",
        href
          ? "hover:bg-gray-200 rounded-lg"
          : "border-b-2 border-gray-300 italic",
        isSelected ? "bg-gray-300" : ""
      )}
      style={{ marginLeft: (level ?? 0) * 24 }}
    >
      {showCollapsableArrowButton && (
        <IconButton
          id={`collapse-${href}`}
          onClick={() => handleCollapse && handleCollapse()}
          square
          small
          title={collapsed ? "Expand Sub-Pages" : "Collapse Sub-Pages"}
        >
          <CollapseIcon
            className={clsx(
              "w-5 h-5 rotate-0 text-gray-500",
              collapsed ? "rotate-0" : "rotate-90"
            )}
          />
        </IconButton>
      )}
      <Wrapper>
        <div
          className={clsx(
            href ? "cursor-pointer" : "",
            typeof collapsed === "boolean" ? "pr-2" : "px-2",
            "flex items-center flex-grow py-0.5 whitespace-prewrap"
          )}
        >
          {showCollapsableNoContentDot && (
            <div className={"p-1 flex items-center justify-center"}>
              <svg
                className={"w-5 h-5 text-gray-500 fill-current stroke-current"}
              >
                <circle cx={"50%"} cy={"50%"} r={2}></circle>
              </svg>
            </div>
          )}
          {IconSlot && (
            <IconSlot className={clsx("text-gray-500 mr-4 w-5 h-5")} />
          )}
          <span className={"py-2 text-sm font-normal tracking-tight"}>
            {name}
          </span>
        </div>
      </Wrapper>
      {hoverAction && HoverIcon && (
        <IconButton
          square
          id={"hover-action"}
          onClick={() => hoverAction.onClick()}
          small
          title={"Add Sub-Page"}
        >
          <HoverIcon className={"w-5 h-5 text-gray-500"} />
        </IconButton>
      )}
    </div>
  );
};
