import { Editor } from "@tiptap/react";
import React from "react";
import { ToolbarButton } from "./ToolbarButton";
import { ToolbarButtonInput } from "./ToolbarButtonInput";
import {
  BoldIcon,
  ItalicIcon,
  StrikeThroughIcon,
  QuoteIcon,
  UndoIcon,
  RedoIcon,
  CodeIcon,
  HorizontalRuleIcon,
  NumberListIcon,
  BulletListIcon,
  LinkIcon,
  ArticleIcon,
  PhotoIcon,
} from "../Icons";
import { ToolbarGroup } from "./ToolbarGroup";
import { TextTypeDropdown } from "./TextTypeDropdown";

export interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { editor } = props;

  if (!editor) return null;

  return (
    <div
      className={"flex flex-wrap border-b bg-gray-100 w-full sticky top-0 z-10"}
    >
      <ToolbarGroup>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <StrikeThroughIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
        >
          <CodeIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
        >
          <QuoteIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <HorizontalRuleIcon />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarGroup>
        <TextTypeDropdown editor={editor} />
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <BulletListIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <NumberListIcon />
        </ToolbarButton>
        <ToolbarButtonInput
          onEntry={(url) =>
            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href: url })
              .run()
          }
          placeholderText={"Link"}
        >
          <LinkIcon />
        </ToolbarButtonInput>
        <ToolbarButtonInput
          onEntry={(url) => editor.chain().focus().setImage({ src: url }).run()}
          placeholderText={"Link to Image"}
        >
          <PhotoIcon />
        </ToolbarButtonInput>
        {/* <ToolbarButtonInput
          // onEntry={(id) => editor.chain().focus().toggleWikiLink({ href: id, wikiId: wiki })}
          onEntry={() => { }}
          placeholderText={"Insert page id here"}
        >
          <ArticleIcon />
        </ToolbarButtonInput> */}
      </ToolbarGroup>
      <ToolbarGroup endItem>
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
          <UndoIcon />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
          <RedoIcon />
        </ToolbarButton>
      </ToolbarGroup>
    </div>
  );
};
