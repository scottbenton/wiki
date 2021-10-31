import { Menu, MenuButton, MenuList, MenuItem } from "components/shared/Menu";
import { SubdirectoryIcon } from "components/shared/Icons";
import { Button } from "components/shared/Button";
import { FirebaseResponse } from "domain/FirebaseResponse";
import { WikiPage } from "domain/WikiPage";
import React from "react";
import ArrowDownIcon from "@heroicons/react/outline/ChevronDownIcon";
import AddIcon from "@heroicons/react/outline/PlusIcon";
import AddSameLevelIcon from "@heroicons/react/outline/ArrowSmRightIcon";

export interface CreateWikiPageButton {
  createPage: (
    newPage: WikiPage,
    parentPageId?: string | undefined
  ) => Promise<FirebaseResponse<WikiPage>>;
  currentPage?: WikiPage;
  currentPageId?: string;
}

export const CreateWikiPageButton: React.FC<CreateWikiPageButton> = (props) => {
  const { createPage, currentPageId, currentPage } = props;

  if (currentPage) {
    return (
      <Menu>
        <MenuButton
          id={"nav-create-page-menu"}
          variant={"outlined"}
          color={"primary"}
          EndIcon={ArrowDownIcon}
        >
          Create Page
        </MenuButton>
        <MenuList>
          <MenuItem
            primaryText={"Add Page Same Level"}
            Icon={AddSameLevelIcon}
            onClick={() =>
              createPage(
                { title: "New Page", childPages: [] },
                currentPage?.parentPage
              )
            }
          />
          <MenuItem
            primaryText={"Add Sub-Page"}
            Icon={SubdirectoryIcon}
            onClick={() => {
              createPage({ title: "New Page", childPages: [] }, currentPageId);
            }}
          />
        </MenuList>
      </Menu>
    );
  } else {
    return (
      <Button
        id={"nav-create-page"}
        variant={"outlined"}
        color={"primary"}
        onClick={() => createPage({ title: "New Page", childPages: [] })}
        EndIcon={AddIcon}
      >
        Create Page
      </Button>
    );
  }
};
