import { Editor } from "@tiptap/react";
import React from "react";
import { Popover } from "@headlessui/react";
import MenuOpenIcon from "@heroicons/react/solid/ChevronDownIcon";
import clsx from "clsx";

export interface TextTypeDropdownProps {
  editor: Editor;
}

enum TEXT_TYPES {
  heading1 = "h1",
  heading2 = "h2",
  heading3 = "h3",
  heading4 = "h4",
  heading5 = "h5",
  paragraph = "p",
}

const textLabels = {
  [TEXT_TYPES.heading1]: "Heading 1",
  [TEXT_TYPES.heading2]: "Heading 2",
  [TEXT_TYPES.heading3]: "Heading 3",
  [TEXT_TYPES.heading4]: "Heading 4",
  [TEXT_TYPES.heading5]: "Heading 5",
  [TEXT_TYPES.paragraph]: "Normal Text",
};

export const TextTypeDropdown: React.FC<TextTypeDropdownProps> = (props) => {
  const { editor } = props;

  const getActiveTextType = () => {
    if (editor.isActive("heading", { level: 2 })) return TEXT_TYPES.heading1;
    if (editor.isActive("heading", { level: 3 })) return TEXT_TYPES.heading2;
    if (editor.isActive("heading", { level: 4 })) return TEXT_TYPES.heading3;
    if (editor.isActive("heading", { level: 5 })) return TEXT_TYPES.heading4;
    if (editor.isActive("heading", { level: 6 })) return TEXT_TYPES.heading5;

    return TEXT_TYPES.paragraph;
  };

  const setActiveTextType = (evt: React.MouseEvent, type: TEXT_TYPES) => {
    evt.preventDefault();
    switch (type) {
      case TEXT_TYPES.heading1:
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case TEXT_TYPES.heading2:
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case TEXT_TYPES.heading3:
        editor.chain().focus().toggleHeading({ level: 4 }).run();
        break;
      case TEXT_TYPES.heading4:
        editor.chain().focus().toggleHeading({ level: 5 }).run();
        break;
      case TEXT_TYPES.heading5:
        editor.chain().focus().toggleHeading({ level: 6 }).run();
        break;
      default:
        editor.chain().focus().setParagraph().run();
    }
  };

  return (
    <Popover as={"div"} className={"relative inline-block z-50"}>
      <div>
        <Popover.Button
          className={
            "p-2 text-sm flex items-center btn rounded-none normal-case w-36 justify-between text-gray-700 hover:bg-gray-200"
          }
        >
          {textLabels[getActiveTextType()]}
          <MenuOpenIcon className={"w-5 h-5"} />
        </Popover.Button>
      </div>
      <Popover.Panel className={"menu-surface w-full"}>
        {Object.keys(textLabels).map((key, index) => (
          <button
            className={clsx("menu-item")}
            onClick={(evt) => setActiveTextType(evt, key as TEXT_TYPES)}
            key={index}
          >
            {textLabels[key as keyof typeof textLabels]}
          </button>
        ))}
      </Popover.Panel>
    </Popover>
  );
};
