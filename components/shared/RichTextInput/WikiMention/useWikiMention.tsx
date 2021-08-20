import React from "react";
import Mention from "@tiptap/extension-mention";
import { useWikiPage } from "components/features/Wiki/WikiPageProvider";
import { ReactRenderer, Editor } from "@tiptap/react";
import { WikiMentionList } from "./WikiMentionList";

export function useWikiMention() {
  const { pages } = useWikiPage();
  const pageDict = pages.data ?? {};

  return Mention.configure({
    HTMLAttributes: {
      class: "bg-primary-100 text-primary-800",
    },
    suggestion: {
      items: (query) =>
        Object.keys(pageDict).filter((pageId) =>
          pageDict[pageId].title.toLowerCase().includes(query.toLowerCase())
        ),
      render: () => {
        let reactRenderer;

        return {
          onStart: (props) => {
            reactRenderer = new ReactRenderer(WikiMentionList, {
              props,
              editor: props.editor as Editor,
            });
          },
        };
      },
    },
  });
}
