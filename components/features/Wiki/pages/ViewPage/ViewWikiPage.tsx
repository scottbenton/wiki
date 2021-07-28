import React from "react";
import { usePageWiki } from "../PageWikiProvider";
import { RichTextInput } from "components/shared/RichTextInput";

export const ViewWikiPage: React.FC = (props) => {
  const { currentPage, currentPageContent } = usePageWiki();

  if (!currentPage) return null;

  return (
    <>
      <h1>{currentPage.title}</h1>
      {currentPageContent.data && (
        <RichTextInput value={currentPageContent.data.content} />
      )}
    </>
  );
};
