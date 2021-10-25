import React, { useEffect, useRef, useState } from "react";
import { Resizable, Size } from "re-resizable";
import { DesktopSidebarHandle } from "./DesktopSidebarHandle";
import clsx from "clsx";
import { SidebarContent } from "../SidebarContent";

export interface DesktopSidebarProps {
  open: boolean;
}

const DEFAULT_SIZES = {
  width: 200,
  height: "auto",
};

export const DesktopSidebar: React.FC<DesktopSidebarProps> = (props) => {
  const { open } = props;

  const resizeableRef = useRef<Resizable>(null);
  const lastSize = useRef<number>(DEFAULT_SIZES.width);
  const [isResizeHovering, setIsResizeHovering] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      resizeableRef.current?.updateSize({
        width: lastSize.current,
        height: DEFAULT_SIZES.height,
      });
    } else {
      lastSize.current =
        resizeableRef.current?.size.width ?? DEFAULT_SIZES.width;
      resizeableRef.current?.updateSize({
        width: 0,
        height: DEFAULT_SIZES.height,
      });
    }
  }, [open]);

  return (
    <Resizable
      className={clsx(
        "bg-gray-200 border-r-2 duration-150 transition-colors ease-in-out min-h-full resizable-desktop-sidebar",
        isResizeHovering ? "border-r-primary-500" : ""
      )}
      ref={resizeableRef}
      minWidth={open ? DEFAULT_SIZES.width : 0}
      maxWidth={"50%"}
      minHeight={"100%"}
      handleComponent={{
        right: <DesktopSidebarHandle setIsHovering={setIsResizeHovering} />,
      }}
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      defaultSize={DEFAULT_SIZES}
      snap={{ x: [DEFAULT_SIZES.width] }}
      snapGap={20}
    >
      <SidebarContent />
    </Resizable>
  );
};
