import React from "react";
import { SidebarWikiPage } from "./SidebarWikiPage";
import { useWikiPage } from "../../../WikiPageProvider";
import Tree from "@atlaskit/tree";
import { useSidebarPageState } from "./useSidebarPageState";

export interface SidebarWikiPagesProps {}

export const SidebarWikiPages: React.FC<SidebarWikiPagesProps> = (props) => {
  const { pages: pageList } = useWikiPage();
  const { treePages, handleExpand, handleCollapse, onDragEnd } =
    useSidebarPageState();

  if (pageList.error) {
    return <p className={"text-gray-500 text-sm px-4"}>{pageList.error}</p>;
  } else if (pageList.loading || !treePages) {
    return <></>;
  } else {
    return (
      <Tree
        tree={treePages}
        renderItem={(props) => <SidebarWikiPage {...props} />}
        onExpand={handleExpand}
        onCollapse={handleCollapse}
        onDragEnd={onDragEnd}
        isDragEnabled
        isNestingEnabled
      />
    );
  }
};
