import React from "react";
import { useWikiPage } from "../../WikiPageProvider";
import { SidebarItem } from "./SidebarItem";
import { SidebarWikiPages } from "./WikiPageItems";
import { wikiPageConfig } from "../../WikiPageConfig";
import OverviewIcon from "@heroicons/react/solid/SparklesIcon";
import SettingsIcon from "@heroicons/react/solid/CogIcon";
import PagesIcon from "@heroicons/react/solid/BookOpenIcon";
import AddPageIcon from "@heroicons/react/solid/DocumentAddIcon";

export const SidebarContent: React.FC = (props) => {
  const { wikiId, createPage } = useWikiPage();

  return (
    <div className={"overflow-y-auto h-full p-2"}>
      <SidebarItem
        name={"About"}
        href={wikiPageConfig.about.constructPath(wikiId)}
        IconSlot={OverviewIcon}
      />
      <SidebarItem
        name={"Settings"}
        href={wikiPageConfig.settings.constructPath(wikiId)}
        IconSlot={SettingsIcon}
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
