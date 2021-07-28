import clsx from "clsx";
import React, { useRef, useState } from "react";
import { Popover } from "@headlessui/react";
import { CheckIcon, XIcon } from "@heroicons/react/solid";

export interface ToolbarButtonInputProps {
  onEntry: (entry: string) => void;
  className?: string;
  placeholderText: string;
}

export const ToolbarButtonInput: React.FC<ToolbarButtonInputProps> = (
  props
) => {
  const { children, className, onEntry, placeholderText } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <Popover as={"div"} className={"relative inline-block"}>
      <div>
        <Popover.Button
          className={clsx(
            className,
            "btn px-2 hover:bg-gray-200 rounded-none text-gray-700"
          )}
        >
          {children}
        </Popover.Button>
      </div>
      <Popover.Panel
        focus
        className={
          "absolute z-20 flex flex-col overflow-hidden rounded-b-lg shadow-lg focus:outline-none bg-gray-900 text-white text-sm px-1 transform -translate-x-1/2"
        }
      >
        <form className={"flex"}>
          <input
            ref={inputRef}
            className={
              "px-2 py-1 border-b-2 focus:border-primary-500 focus:outline-none bg-transparent"
            }
            value={inputValue}
            onChange={(evt) => setInputValue(evt.target.value)}
            placeholder={placeholderText}
          />
          <Popover.Button
            id={"cancel"}
            type={"button"}
            className={
              "p-2 focus:ring-2 ring-smoke-lighter focus:outline-none hover:bg-gray-600"
            }
          >
            <XIcon className={"w-4 h-4"} />
          </Popover.Button>
          <button
            id={"submit"}
            type={"submit"}
            className={
              "p-2 focus:ring-2 ring-smoke-lighter focus:outline-none hover:bg-gray-600"
            }
            onClick={() => {
              onEntry(inputValue);
            }}
          >
            <CheckIcon className={"w-4 h-4"} />
          </button>
        </form>
      </Popover.Panel>
    </Popover>
  );
};
