import React from "react";
import { useWikiPage } from "../WikiPageProvider";
import { wikiPageConfig } from "../WikiPageConfig";
import { Button } from "components/shared/Button";

export const AboutToolbarItems: React.FC = (props) => {
  const { wikiId } = useWikiPage();
  return (
    <Button
      id={"edit-about"}
      variant={"contained"}
      color={"primary"}
      href={wikiPageConfig.edit.constructPath(wikiId)}
    >
      Edit Wiki
    </Button>
  );
};
