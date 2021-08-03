import { Button } from "components/shared/Button";
import { Dialog } from "components/shared/Dialog";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useWikiPage } from "../WikiPageProvider";

export const Settings: React.FC = (props) => {
  const { deleteWiki, wikiId } = useWikiPage();
  const router = useRouter();

  const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] =
    useState<boolean>(false);

  const [deleteRunning, setDeleteRunning] = useState<boolean>(false);

  const handleDelete = async () => {
    setDeleteRunning(true);
    await deleteWiki(wikiId);
    setDeleteRunning(false);
    router.push("/wikis");
  };

  return (
    <>
      <h1 className={"text-xl font-semibold"}>Settings</h1>
      <div className={"mt-2"}>
        <Button
          id={"delete-wiki"}
          color={"error"}
          variant={"contained"}
          onClick={() => setDeleteConfirmationDialogOpen(true)}
        >
          Delete Wiki
        </Button>
      </div>

      <Dialog
        open={deleteConfirmationDialogOpen}
        handleClose={() => setDeleteConfirmationDialogOpen(false)}
        title={"Delete Wiki?"}
        contents={
          "Are you sure you want to delete this Wiki? Doing so will delete all pages and content within."
        }
        actions={
          <>
            <Button
              id={"cancel"}
              onClick={() => setDeleteConfirmationDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              id={"delete"}
              color={"error"}
              variant={"contained"}
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
          </>
        }
      />
    </>
  );
};
