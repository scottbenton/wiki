import { Button, IconButton } from "components/shared/Button";
import React, { useState } from "react";
import { wikiPageConfig } from "../../WikiPageConfig";
import { useWikiPage } from "../../WikiPageProvider";
import DeleteIcon from "@heroicons/react/solid/TrashIcon";
import OverflowIcon from "@heroicons/react/outline/DotsVerticalIcon";
import { Dialog } from "components/shared/Dialog";
import { useRouter } from "next/router";
import {
  Menu,
  MenuList,
  MenuIconButton,
  MenuItem,
} from "components/shared/Menu";
import clsx from "clsx";
import DuplicateIcon from "@heroicons/react/solid/DuplicateIcon";

export const ViewWikiPageToolbar: React.FC = (props) => {
  const { wikiId, deletePage, currentPageId, currentPage, duplicatePage } =
    useWikiPage();

  const router = useRouter();
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] =
    useState<boolean>(false);

  const [actionLoading, setActionLoading] = useState<boolean>(false);

  const handleDeleteClick = async () => {
    if (currentPage && currentPageId) {
      setActionLoading(true);
      const potentialPageToNavigateTo = currentPage.parentPage;
      await deletePage(currentPageId);
      setActionLoading(false);
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

  const handleDuplicateClick = async () => {
    if (currentPageId) {
      setActionLoading(true);
      duplicatePage(currentPageId).finally(() => {
        setActionLoading(false);
      });
    }
  };

  return (
    <>
      <Button
        id={"edit-page"}
        variant={"contained"}
        color={"primary"}
        href={wikiPageConfig.editPage.constructPath(wikiId, currentPageId)}
      >
        Edit
      </Button>
      <Menu>
        <MenuIconButton
          id={"more-options"}
          title={"More Options"}
          square
          disabled={actionLoading}
        >
          <OverflowIcon className={"w-5 h-5"} />
        </MenuIconButton>
        <MenuList>
          <>
            <MenuItem
              onClick={() => handleDuplicateClick()}
              primaryText={"Duplicate Page"}
              Icon={DuplicateIcon}
            />
            <MenuItem
              onClick={() => setConfirmDeleteDialogOpen(true)}
              primaryText={"Delete Page"}
              Icon={DeleteIcon}
            />
          </>
        </MenuList>
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
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button
              id={"confirm-delete"}
              color={"error"}
              variant={"contained"}
              onClick={handleDeleteClick}
              loading={actionLoading}
            >
              Delete
            </Button>
          </>
        }
      />
    </>
  );
};
