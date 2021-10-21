import { Button, IconButton } from "components/shared/Button";
import React, { useState } from "react";
import { wikiPageConfig } from "../../WikiPageConfig";
import { useWikiPage } from "../../WikiPageProvider";
import DeleteIcon from "@heroicons/react/solid/TrashIcon";
import OverflowIcon from "@heroicons/react/outline/DotsVerticalIcon";
import { Dialog } from "components/shared/Dialog";
import { useRouter } from "next/router";
import { Menu } from "@headlessui/react";
import clsx from "clsx";
import DuplicateIcon from "@heroicons/react/solid/DuplicateIcon";

export const ViewWikiPageToolbar: React.FC = (props) => {
  const { wikiId, deletePage, currentPageId, currentPage } = useWikiPage();

  const router = useRouter();
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] =
    useState<boolean>(false);

  const [pageDeleting, setPageDeleting] = useState<boolean>(false);

  const handleDeleteClick = async () => {
    if (currentPage && currentPageId) {
      setPageDeleting(true);
      const potentialPageToNavigateTo = currentPage.parentPage;
      await deletePage(currentPageId);
      setPageDeleting(false);
      router.push(
        potentialPageToNavigateTo
          ? wikiPageConfig.viewPage.constructPath(
              wikiId,
              potentialPageToNavigateTo
            )
          : wikiPageConfig.about.constructPath(wikiId)
      );
      setConfirmDeleteDialogOpen(false);
    }
  };

  return (
    <div className={"flex space-x-2"}>
      <Button
        id={"edit-page"}
        variant={"contained"}
        color={"primary"}
        href={wikiPageConfig.editPage.constructPath(wikiId, currentPageId)}
      >
        Edit
      </Button>
      <Menu as="div" className={"relative"}>
        <Menu.Button
          as={IconButton}
          title={"More Options"}
          className={"btn"}
          square
        >
          <OverflowIcon className={"w-5 h-5"} />
        </Menu.Button>
        <Menu.Items className={"menu-surface right-0 rounded-lg w-48"}>
          <Menu.Item>
            {({ active }) => (
              <button
                className={clsx(
                  "menu-item",
                  active ? "menu-item-selected" : ""
                )}
                onClick={() => alert("DUPLICATE CLICKED")}
              >
                Duplicate Page
                <DuplicateIcon className={"w-5 h-5 ml-2"} />
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={clsx(
                  "menu-item",
                  active ? "menu-item-selected" : ""
                )}
                onClick={() => setConfirmDeleteDialogOpen(true)}
              >
                Delete Page
                <DeleteIcon className={"w-5 h-5 ml-2"} />
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
      <Dialog
        open={confirmDeleteDialogOpen}
        handleClose={() => setConfirmDeleteDialogOpen(false)}
        title={"Confirm Page Deletion"}
        contents={
          "Are you sure you want to delete this page? All pages underneath this page will also be deleted."
        }
        actions={
          <>
            <Button
              id={"cancel"}
              onClick={() => setConfirmDeleteDialogOpen(false)}
              disabled={pageDeleting}
            >
              Cancel
            </Button>
            <Button
              id={"confirm-delete"}
              color={"error"}
              variant={"contained"}
              onClick={handleDeleteClick}
              loading={pageDeleting}
            >
              Delete
            </Button>
          </>
        }
      />
    </div>
  );
};
