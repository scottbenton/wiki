import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import { IconButton } from "components/shared/Button";
import CollapseIcon from "@heroicons/react/solid/ChevronRightIcon";

export interface SidebarItemProps {
  name: string;
  level?: number;
  collapsed?: boolean;
  hasCollapseContent?: boolean;
  handleCollapse?: () => void;
  IconSlot?: typeof CollapseIcon;
  hoverAction?: {
    onClick: () => void;
    Icon: typeof CollapseIcon;
  };
  href?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = (props) => {
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
        "flex text-white",
        href
          ? "hover:bg-primary-800 rounded-lg"
          : "border-b-2 border-primary-600 italic",
        isSelected ? "bg-primary-800" : ""
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
        >
          <CollapseIcon
            className={clsx(
              "w-4 h-4 rotate-0 text-primary-100",
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
            "flex items-center flex-grow py-0.5 whitespace-nowrap"
          )}
        >
          {showCollapsableNoContentDot && (
            <div className={"p-1 flex items-center justify-center"}>
              <svg
                className={
                  "w-4 h-4 text-primary-100 fill-current stroke-current"
                }
              >
                <circle cx={"50%"} cy={"50%"} r={2}></circle>
              </svg>
            </div>
          )}
          {IconSlot && (
            <IconSlot className={clsx("text-primary-100 mr-4 w-5 h-5")} />
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
          className={isHovering ? "visible" : "invisible"}
          onClick={() => hoverAction.onClick()}
          small
        >
          <HoverIcon className={"w-5 h-5 text-primary-100"} />
        </IconButton>
      )}
    </div>
  );
};
