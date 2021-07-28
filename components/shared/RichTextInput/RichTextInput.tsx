import React from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Editor } from "./Editor";
import { Toolbar } from "./Toolbar";
import clsx from "clsx";
export interface RichTextInputProps {
  value: string;
  onChange?: (value: string) => void;
}

export const RichTextInput: React.FC<RichTextInputProps> = (props) => {
  const { value, onChange } = props;

  const readOnly = onChange ? false : true;

  const editor = useEditor({
    extensions: [StarterKit, Link, Image],
    content: value,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      console.debug("Change occurs");
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
    return <Editor editor={editor} />;
  }
  return (
    <div
      className={clsx(
        "border relative rounded-lg overflow-hidden",
        editor?.isFocused ? "border-gray-500" : ""
      )}
    >
      <div className={"flex flex-col w-full"}>
        {!readOnly && <Toolbar editor={editor} />}
        <div className={"p-4"}>
          <Editor editor={editor} />
        </div>
      </div>
    </div>
  );
};
