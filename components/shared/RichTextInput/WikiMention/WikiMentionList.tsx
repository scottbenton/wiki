import { Menu } from "@headlessui/react";
import { command } from "@tiptap/core/dist/packages/core/src/extensions/commands";
import React from "react";

export interface WikiMentionListProps {
  items: string[];
  command: (id: string) => void;
}

export const WikiMentionList: React.FC<WikiMentionListProps> = (props) => {
  const { items, command } = props;

  const handleItemClick = (id: string) => {
    command(id);
  };

  return (
    <>
      {items.map((item, index) => (
        <Menu.Item
          key={index}
          as="button"
          onClick={() => handleItemClick(item)}
        >
          {item}
        </Menu.Item>
      ))}
    </>
  );
};
