import React from "react";
import { SidebarWikiPage } from "./SidebarWikiPage";
import { useWikiPage } from "../../WikiPageProvider";

export interface SidebarWikiPagesProps {}

export const SidebarWikiPages: React.FC<SidebarWikiPagesProps> = (props) => {
  const { pages: pageList, info } = useWikiPage();
  const { data: pages } = pageList;

  if (pageList.error) {
    return <p className={"text-gray-500 text-sm px-4"}>{pageList.error}</p>;
  } else if (pageList.loading || !pages || !info.data) {
    return null;
  } else {
    return (
      <div className={"mt-1"}>
        {info.data.rootPages.map((pageId, index) => (
          <SidebarWikiPage pageId={pageId} key={index} />
        ))}
      </div>
    );
  }
};
