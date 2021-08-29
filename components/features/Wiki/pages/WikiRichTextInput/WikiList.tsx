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
      <div className={"bg-white shadow-lg py-2 rounded-md border"}>
        {items.map(
          (pageId, index) =>
            pageDict[pageId] && (
              <button
                key={index}
                className={clsx(
                  "btn rounded-none normal-case font-normal font-body w-full justify-start",
                  selectedIndex === index ? "bg-gray-100 " : ""
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
