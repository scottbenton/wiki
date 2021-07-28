import React, { useState } from "react";
import { SidebarItem } from "./SidebarItem";
import AddPageIcon from "@heroicons/react/solid/DocumentAddIcon";
import { useBaseWikiInfo } from "../../BaseWikiProvider";
import { wikiPageConfig } from "../../WikiPageConfig";
export interface SidebarWikiPageProps {
  pageId: string;
  depth?: number;
}

export const SidebarWikiPage: React.FC<SidebarWikiPageProps> = (props) => {
  const { pageId, depth } = props;

  const { wikiId } = useBaseWikiInfo();

  const { pages: pageList, createPage } = useBaseWikiInfo();
  const { data: pages } = pageList;

  const [collapsed, setCollapsed] = useState<boolean>(true);

  if (!pages || !pages[pageId]) {
    return null;
  }

  const page = pages[pageId];

  return (
    <>
      <SidebarItem
        name={pages[pageId].title}
        href={wikiPageConfig.viewPage.constructPath(wikiId, pageId)}
        collapsed={collapsed}
        handleCollapse={() => setCollapsed((coll) => !coll)}
        hasCollapseContent={page.childPages.length > 0}
        level={depth}
        hoverAction={{
          onClick: () =>
            createPage(
              { title: "New Page", childPages: [], parentPage: pageId },
              pageId
            ),
          Icon: AddPageIcon,
        }}
      />
      {!collapsed &&
        page.childPages.map((pageId, index) => (
          <SidebarWikiPage
            pageId={pageId}
            depth={(depth ?? 0) + 1}
            key={index}
          />
        ))}
    </>
  );
};
