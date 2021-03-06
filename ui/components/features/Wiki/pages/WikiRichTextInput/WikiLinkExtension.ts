import { ReactRenderer } from "@tiptap/react";
import { useWikiPage } from "components/features/Wiki/WikiPageProvider";
import { createRef, useState } from "react";
import tippy from "tippy.js";
import { WikiList, WikiListRef } from "./WikiList";

import { Node, mergeAttributes } from "@tiptap/core";
import { Node as ProseMirrorNode } from "prosemirror-model";
import { PluginKey, Plugin } from "prosemirror-state";
import Suggestion from "@tiptap/suggestion";
import { useRouter } from "next/router";
import { wikiPageConfig } from "components/features/Wiki/WikiPageConfig";
import clsx from "clsx";

export const WikiLinkPluginKey = new PluginKey("wiki-link");

export function useWikiLinkExtensionScratch() {
  const { pages, wikiId } = useWikiPage();
  const pageDict = pages.data ?? {};

  const router = useRouter();

  const char = "#";

  const renderLabel = (node: ProseMirrorNode<any>) => {
    return char + " " + (pageDict[node.attrs.id]?.title ?? "Page Not Found");
  };

  return Node.create({
    name: "wiki-link",
    group: "inline",

    inline: true,

    selectable: false,

    atom: true,

    addAttributes() {
      return {
        id: {
          default: null,
          parseHTML: (element) => {
            return element.getAttribute("data-id");
          },
          renderHTML: (attributes) => {
            if (!attributes.id) {
              return {};
            }
            return { "data-id": attributes.id };
          },
        },
      };
    },

    parseHTML() {
      return [
        {
          tag: "a[data-wiki-link]",
        },
      ];
    },

    renderHTML({ node, HTMLAttributes }) {
      return [
        "a",
        mergeAttributes(
          { "data-wiki-link": "" },
          {
            class: clsx(
              "wiki-link",
              pageDict[node.attrs.id] ? "wiki-link-normal" : "wiki-link-error"
            ),
            // href: wikiPageConfig.viewPage.constructPath(
            //   wikiId,
            //   node.attrs.id
            // ),
          },
          HTMLAttributes
        ),
        renderLabel(node),
      ];
    },

    renderText({ node }) {
      return renderLabel(node);
    },

    addKeyboardShortcuts() {
      return {
        Backspace: () =>
          this.editor.commands.command(({ tr, state }) => {
            let isMention = false;
            const { selection } = state;
            const { empty, anchor } = selection;

            if (!empty) {
              return false;
            }

            state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
              if (node.type.name === this.name) {
                isMention = true;
                tr.insertText(char || "", pos, pos + node.nodeSize);

                return false;
              }
            });

            return isMention;
          }),
      };
    },

    addProseMirrorPlugins() {
      return [
        Suggestion({
          editor: this.editor,
          allowSpaces: true,
          items: (query) =>
            Object.keys(pageDict)
              .filter((pageId) =>
                pageDict[pageId].title
                  ?.toLowerCase()
                  .includes(query.toLowerCase())
              )
              .slice(0, 5),
          render: () => {
            let reactRenderer: any;
            let popup: any;
            const ref = createRef<WikiListRef>();

            return {
              onStart: (props) => {
                reactRenderer = new ReactRenderer(WikiList as any, {
                  props: { ...props, ref: ref },
                  editor: props.editor as any,
                });

                popup = tippy("body", {
                  getReferenceClientRect: props.clientRect,
                  appendTo: () => document.body,
                  content: reactRenderer.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: "manual",
                  placement: "bottom-start",
                });
              },
              onUpdate(props) {
                reactRenderer.updateProps(props);

                popup[0].setProps({
                  getReferenceClientRect: props.clientRect,
                });
              },
              onKeyDown(props) {
                if (props.event.key === "Escape") {
                  popup[0].hide();

                  return true;
                }
                return ref.current?.handleKeyDown(props.event) ?? false;
              },
              onExit() {
                popup[0].destroy();
                reactRenderer.destroy();
              },
            };
          },
          char: char,
          command: ({ editor, range, props }) => {
            // increase range.to by one when the next node is of type "text"
            // and starts with a space character
            const nodeAfter = editor.view.state.selection.$to.nodeAfter;
            const overrideSpace = nodeAfter?.text?.startsWith(" ");

            if (overrideSpace) {
              range.to += 1;
            }
            editor
              .chain()
              .focus()
              .insertContentAt(range, [
                {
                  type: "wiki-link",
                  attrs: props,
                },
                {
                  type: "text",
                  text: " ",
                },
              ])
              .run();
          },
          allow: ({ editor, range }) => {
            return editor.can().insertContentAt(range, { type: "wiki-link" });
          },
        }),
        new Plugin({
          key: new PluginKey("handleWikiLinkClick"),
          props: {
            handleClick: (view, pos, event) => {
              const attributes = (event.target as any)?.attributes;
              const pageId = attributes?.getNamedItem("data-id")?.value;
              if (pageId && pageDict[pageId]) {
                if (view.editable) {
                  // Push new tab
                  window.open(
                    wikiPageConfig.viewPage.constructPath(wikiId, pageId),
                    "_blank"
                  );
                } else {
                  router.push(
                    wikiPageConfig.viewPage.constructPath(wikiId, pageId)
                  );
                }

                return true;
              }

              return false;
            },
          },
        }),
      ];
    },
  });
}
