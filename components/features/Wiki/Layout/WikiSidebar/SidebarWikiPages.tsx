import React from "react";
import { SidebarWikiPage } from "./SidebarWikiPage";
import { useWikiPageState } from "hooks/useWikiPageState";
import { useBaseWikiInfo } from "../../BaseWikiProvider";

export interface SidebarWikiPagesProps {}

export const SidebarWikiPages: React.FC<SidebarWikiPagesProps> = (props) => {
  const { wiki } = useWikiPageState();
  const { pages: pageList } = useBaseWikiInfo();
  const { data: pages } = pageList;

  if (pageList.error) {
    return <p className={"text-gray-500 text-sm px-4"}>{pageList.error}</p>;
  } else if (pageList.loading || !pages || !wiki) {
    return null;
  } else {
    return (
      <div className={"mt-1"}>
        {wiki.rootPages.map((pageId, index) => (
          <SidebarWikiPage pageId={pageId} key={index} />
        ))}
      </div>
    );
  }
};
