import React from "react";
import { useBaseWikiInfo } from "../BaseWikiProvider";
import { wikiPageConfig } from "../WikiPageConfig";
import { Button } from "components/shared/Button";

export const AboutToolbarItems: React.FC = (props) => {
  const { wikiId } = useBaseWikiInfo();
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
