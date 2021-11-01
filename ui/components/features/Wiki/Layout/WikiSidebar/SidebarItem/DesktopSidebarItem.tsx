import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SidebarItemProps } from "./SidebarItem";
import Link from "next/link";
import { IconButton } from "components/shared/Button";
import CollapseIcon from "@heroicons/react/solid/ChevronRightIcon";

export const DesktopSidebarItem: React.FC<SidebarItemProps> = (props) => {
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

  const [isHovering, setIsHovering] = useState<boolean>(false);

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
        "flex text-gray-700 truncate",
        href
          ? "hover:bg-gray-300 rounded-lg"
          : "border-b-2 border-gray-300 italic",
        isSelected ? "bg-gray-300" : ""
      )}
      style={{ marginLeft: (level ?? 0) * 24 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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
            "flex items-center flex-grow py-0.5 whitespace-nowrap truncate"
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
          <span className={"py-1 text-sm font-normal tracking-tight truncate"}>
            {name}
          </span>
        </div>
      </Wrapper>
      {hoverAction && HoverIcon && isHovering && (
        <IconButton
          square
          id={"hover-action"}
          className={isHovering ? "visible" : "invisible"}
          onClick={() => hoverAction.onClick()}
          small
          title={"Create Sub-Page"}
        >
          <HoverIcon className={"w-5 h-5 text-gray-500"} />
        </IconButton>
      )}
    </div>
  );
};
