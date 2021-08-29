import React from "react";
import { useEditor } from "@tiptap/react";
import { Extensions } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Editor } from "./Editor";
import { Toolbar } from "./Toolbar";
import clsx from "clsx";

export interface RichTextInputProps {
  value: string;
  onChange?: (value: string) => void;
  extensions?: Extensions;
}

export const RichTextInput: React.FC<RichTextInputProps> = (props) => {
  const { value, onChange, extensions = [] } = props;

  const readOnly = onChange ? false : true;

  const editor = useEditor({
    extensions: [StarterKit, Link, Image, ...extensions],
    content: value,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      onChange && onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm md:prose-md w-full focus:outline-none max-w-none",
      },
    },
  });

  if (readOnly) {
    return <Editor editor={editor} readOnly />;
  }
  return (
    <div
      className={clsx(
        "border relative rounded-lg",
        editor?.isFocused ? "border-gray-500" : ""
      )}
    >
      <div className={"flex flex-col w-full"}>
        <Toolbar editor={editor} />
        <Editor editor={editor} readOnly={false} />
      </div>
    </div>
  );
};
