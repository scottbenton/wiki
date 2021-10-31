import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/shift-away.css";

export interface TooltipProps {
  content: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const { content, children } = props;

  if (!content) {
    return <>{children}</>;
  }

  return (
    <Tippy
      content={content}
      placement={"bottom"}
      animation={"shift-away"}
      duration={300}
      delay={[800, null]}
      className={"bg-gray-700 text-white rounded-lg px-2 py-0.5 text-sm -mt-2"}
    >
      <span>{children}</span>
    </Tippy>
  );
};
