import { Button } from "components/shared/Button";
import React from "react";
import { useBaseWikiInfo } from "../../BaseWikiProvider";
import { wikiPageConfig } from "../../WikiPageConfig";
import { usePageWiki } from "../PageWikiProvider";

export const ViewWikiPageToolbar: React.FC = (props) => {
  const { wikiId, params } = useBaseWikiInfo();

  const pageId = params.length > 2 ? params[2] : "";
  return (
    <Button
      id={"edit-page"}
      variant={"contained"}
      color={"primary"}
      href={wikiPageConfig.editPage.constructPath(wikiId, pageId)}
    >
      Edit Page
    </Button>
  );
};
