import { useIsMobile } from "hooks/useIsMobile";
import React from "react";
import { DesktopSidebarItem } from "./DesktopSidebarItem";
import { MobileSidebarItem } from "./MobileSidebarItem";

export interface SidebarItemProps {
  name: string;
  level?: number;
  collapsed?: boolean;
  hasCollapseContent?: boolean;
  handleCollapse?: () => void;
  IconSlot?: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  hoverAction?: {
    onClick: () => void;
    Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  };
  href?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = (props) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileSidebarItem {...props} />;
  } else {
    return <DesktopSidebarItem {...props} />;
  }
};
