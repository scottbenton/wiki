import React, { useEffect } from "react";
import { Transition } from "@headlessui/react";
import { SidebarItem } from "./SidebarItem";
import OverviewIcon from "@heroicons/react/solid/SparklesIcon";
import PagesIcon from "@heroicons/react/solid/BookOpenIcon";
import { SidebarWikiPages } from "./SidebarWikiPages";
import AddPageIcon from "@heroicons/react/solid/DocumentAddIcon";
import { useBaseWikiInfo } from "../../BaseWikiProvider";
import { wikiPageConfig } from "../../WikiPageConfig";
import clsx from "clsx";

export interface WikiSidebarProps {
  open: boolean;
}

export const WikiSidebar: React.FC<WikiSidebarProps> = (props) => {
  const { open } = props;
  const { wikiId, createPage } = useBaseWikiInfo();

  return (
    <>
      <div
        className={clsx(
          "transition-all duration-300 ease-in-out relative",
          open ? "w-full sm:w-1/4" : "w-0"
        )}
      >
        <div
          className={clsx(
            "bg-primary-700 absolute shadow-lg w-full px-1 transition-all transform duration-300 ease-in-out h-full flex-wrap flex flex-col py-2 overflow-x-auto",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
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
      </div>
    </>
  );
};
