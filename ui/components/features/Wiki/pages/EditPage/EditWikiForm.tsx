import { Button } from "components/shared/Button";
import { InputLabel } from "components/shared/TextInput";
import React, { useState } from "react";
import { WikiRichTextInput } from "../WikiRichTextInput";

export interface EditWikiFormProps {
  currentTitle: string;
  currentContent: string;
  cancelHref: string;
  handleSave: (newTitle: string, newContent: string) => void;
}

export const EditWikiForm: React.FC<EditWikiFormProps> = (props) => {
  const { currentTitle, currentContent, cancelHref, handleSave } = props;

  const [title, setTitle] = useState<string>(currentTitle);
  const [content, setContent] = useState<string>(currentContent);

  const onSave = () => {
    handleSave(title, content);
  };

  return (
    <div className={"w-full mx-auto max-w-screen-md space-y-4"}>
      <label className={"flex flex-col"}>
        <InputLabel className={"text-gray-500 font-normal"}>
          Page Title
        </InputLabel>
        <input
          className={
            "border-b text-xl px-2 focus:outline-none focus:border-gray-500"
          }
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
      </label>
      <WikiRichTextInput value={content} onChange={(val) => setContent(val)} />
      <div className={"flex justify-end space-x-1"}>
        <Button id="cancel" href={cancelHref}>
          Cancel
        </Button>
        <Button
          id="save"
          variant={"contained"}
          color={"primary"}
          onClick={() => onSave()}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};
