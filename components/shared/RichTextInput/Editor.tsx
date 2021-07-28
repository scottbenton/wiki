import React from "react";
import { Editor as IEditor, EditorContent } from "@tiptap/react";

export interface EditorProps {
  editor: IEditor | null;
}

export const Editor: React.FC<EditorProps> = (props) => {
  const { editor } = props;

  return (
    <EditorContent editor={editor} className={"block focus:outline-none"} />
  );
};
