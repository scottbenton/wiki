import React from "react";
import { useWikiPage } from "../../WikiPageProvider";
import { RichTextInput } from "components/shared/RichTextInput";

export const ViewWikiPage: React.FC = (props) => {
  const { currentPage, currentPageContent } = useWikiPage();

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
