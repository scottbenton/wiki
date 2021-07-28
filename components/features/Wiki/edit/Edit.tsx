import { WikiForm } from "components/features/WikiList/WikiForm";
import { Wiki } from "domain/Wiki";
import { useRouter } from "next/router";
import React from "react";
import { useBaseWikiInfo } from "../BaseWikiProvider";
import { wikiPageConfig } from "../WikiPageConfig";

export const Edit: React.FC = (props) => {
  const { wikiId, info, updateWiki } = useBaseWikiInfo();
  const router = useRouter();

  const handleSubmit = (wiki: Wiki) => {
    updateWiki(wikiId, wiki);
    router.push(wikiPageConfig.about.constructPath(wikiId));
  };

  if (!info.data) {
    return null;
  }
  return <WikiForm existingWiki={info.data} submitWiki={handleSubmit} />;
};
