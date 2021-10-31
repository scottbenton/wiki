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
      className={
        "flex flex-wrap border-b bg-gray-100 w-full sticky top-0 z-10 rounded-t-lg"
      }
    >
      <ToolbarGroup>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title={"Bold"}
        >
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title={"Italics"}
        >
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          title={"Strike-Through"}
        >
          <StrikeThroughIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
          title={"Code Block"}
        >
          <CodeIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          title={"Block Quote"}
        >
          <QuoteIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title={"Horizontal Rule"}
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
          title={"Bullet List"}
        >
          <BulletListIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title={"Ordered List"}
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
          title={"Add a Link"}
        >
          <LinkIcon />
        </ToolbarButtonInput>
        <ToolbarButtonInput
          onEntry={(url) => editor.chain().focus().setImage({ src: url }).run()}
          placeholderText={"Link to Image"}
          title={"Add an Image"}
        >
          <PhotoIcon />
        </ToolbarButtonInput>
      </ToolbarGroup>
      <ToolbarGroup endItem>
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title={"Undo"}
        >
          <UndoIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title={"Redo"}
        >
          <RedoIcon />
        </ToolbarButton>
      </ToolbarGroup>
    </div>
  );
};
