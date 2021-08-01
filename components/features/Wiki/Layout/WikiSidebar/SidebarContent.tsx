import React from "react";
import { useBaseWikiInfo } from "../../BaseWikiProvider";
import { SidebarItem } from "./SidebarItem";
import { SidebarWikiPages } from "./SidebarWikiPages";
import { wikiPageConfig } from "../../WikiPageConfig";
import OverviewIcon from "@heroicons/react/solid/SparklesIcon";
import AddPageIcon from "@heroicons/react/solid/DocumentAddIcon";
import PagesIcon from "@heroicons/react/solid/BookOpenIcon";

export const SidebarContent: React.FC = (props) => {
  const { wikiId, createPage } = useBaseWikiInfo();

  return (
    <div className={"overflow-y-auto h-full p-2"}>
      <SidebarItem
        name={"About"}
        href={wikiPageConfig.about.constructPath(wikiId)}
        IconSlot={OverviewIcon}
      />
      <SidebarItem
        name={"Pages"}
        IconSlot={PagesIcon}
        hoverAction={{
          onClick: () => createPage({ title: "New Page", childPages: [] }),
          Icon: AddPageIcon,
        }}
      />
      <SidebarWikiPages />
    </div>
  );
};
