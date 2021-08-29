import clsx from "clsx";
import { useWikiPage } from "components/features/Wiki/WikiPageProvider";
import React, { useImperativeHandle, useState } from "react";

export interface WikiListProps {
  items: any[];
  command: (props: any) => void;
}

export interface WikiListRef {
  handleKeyDown: (evt: KeyboardEvent) => void;
}

export const WikiList = React.forwardRef<WikiListRef, WikiListProps>(
  (props, ref) => {
    const { items, command } = props;
    const { pages } = useWikiPage();
    const pageDict = pages.data || {};

    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const handleSelectionMove = (jump: number) => {
      setSelectedIndex((prevIndex) => (prevIndex + jump) % items.length);
    };
    const handleSelection = (index?: number) => {
      const item = items[index ?? selectedIndex];

      if (item) {
        command({ id: item });
      }
    };

    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === "ArrowUp") {
        handleSelectionMove(-1);
        return true;
      }
      if (evt.key === "ArrowDown") {
        handleSelectionMove(1);
        return true;
      }
      if (evt.key === "Enter") {
        handleSelection();
        return true;
      }
      return false;
    };

    useImperativeHandle(ref, () => ({
      handleKeyDown,
    }));

    return (
      <div
        className={
          "flex flex-col overflow-hidden w-full rounded-b-lg shadow-lg focus:outline-none bg-gray-900 text-white text-sm py-1"
        }
      >
        {items.map(
          (pageId, index) =>
            pageDict[pageId] && (
              <button
                key={index}
                className={clsx(
                  "py-1 px-4 hover:bg-gray-700 font-semibold text-left",
                  selectedIndex === index ? "bg-gray-700 " : ""
                )}
                onClick={() => handleSelection(index)}
              >
                {pageDict[pageId].title}
              </button>
            )
        )}
      </div>
    );
  }
);
