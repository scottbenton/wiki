import React from "react";
import Link from "next/link";
import { Button, IconButton } from "components/shared/Button";
import { MenuIcon } from "@heroicons/react/outline";
import { useWikiPage } from "../WikiPageProvider";
import { wikiPageConfig } from "../WikiPageConfig";
import { CreateWikiPageButton } from "./CreateWikiPageButton";

export interface WikiToolbarProps {
  toggleSidebar?: () => void;
  ToolbarItems?: React.FC;
}

export const WikiToolbar: React.FC<WikiToolbarProps> = (props) => {
  const { toggleSidebar, ToolbarItems } = props;
  const { wikiId, info, currentPageId, createPage, currentPage } =
    useWikiPage();

  return (
    <div className={"justify-between flex items-center py-2"}>
      <div className={"flex items-center"}>
        {toggleSidebar && (
          <IconButton
            title={"Toggle Sidebar View"}
            className={"mr-2 text-gray-500 rounded-md"}
            id={"toggle-sidebar"}
            onClick={() => toggleSidebar()}
          >
            <MenuIcon className={"w-6 h-6"} />
          </IconButton>
        )}
        <Link href={wikiPageConfig.about.constructPath(wikiId)}>
          <h1 className={"text-xl font-semibold truncate"}>
            {info.data?.name}
          </h1>
        </Link>
      </div>
      <div className={"flex flex-wrap space-x-2"}>
        <CreateWikiPageButton
          createPage={createPage}
          currentPageId={currentPageId}
          currentPage={currentPage}
        />
        {ToolbarItems && <ToolbarItems />}
      </div>
    </div>
  );
};
