import React from "react";
import Link from "next/link";
import { IconButton } from "components/shared/Button";
import { MenuIcon } from "@heroicons/react/outline";
import { useBaseWikiInfo } from "../BaseWikiProvider";
import { wikiPageConfig } from "../WikiPageConfig";

export interface WikiToolbarProps {
  toggleSidebar?: () => void;
  ToolbarItems?: React.FC;
}

export const WikiToolbar: React.FC<WikiToolbarProps> = (props) => {
  const { toggleSidebar, ToolbarItems } = props;
  const { wikiId, info } = useBaseWikiInfo();

  return (
    <div className={"justify-between flex items-center py-2"}>
      <div className={"flex items-center"}>
        {toggleSidebar && (
          <IconButton
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
      {ToolbarItems && <ToolbarItems />}
    </div>
  );
};
