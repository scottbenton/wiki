import { IconButton } from "components/shared/Button";
import React, { useState } from "react";
import { wikiPageConfig } from "../../WikiPageConfig";
import { useWikiPage } from "../../WikiPageProvider";
import EditIcon from "@heroicons/react/outline/PencilIcon";

export const WikiPageEditTitle: React.FC = (props) => {
  const { children } = props;
  const { wikiId, currentPageId } = useWikiPage();

  const [hovering, setHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={"flex"}
    >
      <h1>{children}</h1>
      {hovering && (
        <IconButton
          id={"edit-wiki-page"}
          title={"Edit Page"}
          className={"ml-4"}
          href={wikiPageConfig.editPage.constructPath(wikiId, currentPageId)}
        >
          <EditIcon className={"w-5 h-5"} />
        </IconButton>
      )}
    </div>
  );
};
