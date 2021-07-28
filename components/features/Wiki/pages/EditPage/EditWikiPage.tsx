import { useRouter } from "next/router";
import React from "react";
import { wikiPageConfig } from "../../WikiPageConfig";
import { usePageWiki } from "../PageWikiProvider";
import { EditWikiForm } from "./EditWikiForm";

export const EditWikiPage: React.FC = (props) => {
  const {
    wikiId,
    currentPage,
    currentPageContent,
    currentPageId,
    updatePage,
    updatePageContent,
  } = usePageWiki();

  const router = useRouter();

  const handleUpdate = (newTitle: string, newContent: string) => {
    if (currentPageId && currentPage) {
      updatePage(currentPageId, { ...currentPage, title: newTitle });
      updatePageContent(currentPageId, newContent);
      router.push(wikiPageConfig.viewPage.constructPath(wikiId, currentPageId));
    }
  };

  if (!currentPage || currentPageContent.loading) {
    return null;
  } else {
    return (
      <EditWikiForm
        currentTitle={currentPage.title}
        currentContent={currentPageContent.data?.content ?? ""}
        cancelHref={wikiPageConfig.viewPage.constructPath(
          wikiId,
          currentPageId
        )}
        handleSave={handleUpdate}
      />
    );
  }
};
