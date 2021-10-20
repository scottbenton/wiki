import React from "react";
import { useWikiPage } from "../../WikiPageProvider";
import { WikiRichTextInput } from "../WikiRichTextInput";

export const ViewWikiPage: React.FC = (props) => {
  const { currentPage, currentPageContent } = useWikiPage();

  if (!currentPage) return null;

  return (
    <>
      <h1>{currentPage.title}</h1>
      {currentPageContent.data && (
        <WikiRichTextInput value={currentPageContent.data.content} />
      )}
    </>
  );
};
