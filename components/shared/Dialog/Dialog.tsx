import React from "react";
import { Dialog as HDialog } from "@headlessui/react";
import { Card } from "../Card";
import { IconButton } from "../Button";
import CloseIcon from "@heroicons/react/outline/XIcon";

export interface DialogProps {
  open: boolean;
  handleClose: () => void;
  title: React.ReactNode;
  contents?: React.ReactNode;
  actions: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = (props) => {
  const { title, contents, actions, open, handleClose } = props;

  return (
    <HDialog
      open={open}
      onClose={handleClose}
      className={"fixed z-50 inset-0 overflow-y-auto px-2"}
    >
      <div className={"flex items-center justify-center min-h-screen"}>
        <HDialog.Overlay className={"fixed inset-0 bg-black opacity-30"} />
        <Card className={"z-50 overflow-hidden max-w-2xl"}>
          <div className={"px-4 md:px-6 py-4"}>
            <div className={"flex justify-between items-center"}>
              <HDialog.Title className={"font-semibold text-xl"}>
                {title}
              </HDialog.Title>
              <IconButton
                id={"close"}
                onClick={handleClose}
                square
                title={"Close Dialog"}
              >
                <CloseIcon className={"w-5 h-5"} />
              </IconButton>
            </div>
            <article className={"mt-2 md:mt-4 text-gray-700"}>
              {contents}
            </article>
          </div>
          <div
            className={
              "w-full space-x-2 flex flex-wrap bg-gray-200 py-2 px-4 md:px-6 justify-end"
            }
          >
            {actions}
          </div>
        </Card>
      </div>
    </HDialog>
  );
};
