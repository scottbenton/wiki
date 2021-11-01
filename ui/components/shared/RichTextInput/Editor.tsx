import React from "react";
import { Editor as IEditor, EditorContent } from "@tiptap/react";
import clsx from "clsx";

export interface EditorProps {
  editor: IEditor | null;
  readOnly: boolean;
}

export const Editor: React.FC<EditorProps> = (props) => {
  const { editor, readOnly } = props;

  return (
    <EditorContent
      editor={editor}
      className={clsx("block focus:outline-none", readOnly ? "" : "p-4")}
    />
  );
};
