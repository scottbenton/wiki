import { useEffect, useState, useRef } from "react";
import {
  ItemId,
  TreeData,
  TreeItem,
  TreeSourcePosition,
  TreeDestinationPosition,
  moveItemOnTree,
} from "@atlaskit/tree";
import { useWikiPage } from "../../../WikiPageProvider";
import { mutateTree } from "@atlaskit/tree";
import { WikiPage, WikiPageObject } from "domain/WikiPage";

type TreeItems = TreeData["items"];

const DEFAULT_STATE: TreeData = {
  rootId: "-1",
  items: {},
};

function addRootPageToItems(rootPages: string[], items: TreeItems): TreeItems {
  return {
    ...items,
    "-1": {
      id: "-1",
      children: rootPages,
    },
  };
}

function convertPagesToTreeItems(
  pages: WikiPageObject,
  oldItems?: TreeItems
): TreeItems {
  let items: TreeItems = {};
  Object.keys(pages).forEach((pageId) => {
    items[pageId] = convertPageToTreeItem(
      pageId,
      pages[pageId],
      oldItems ? oldItems[pageId] : undefined
    );
  });

  return items;
}

function convertPageToTreeItem(
  id: string,
  page: WikiPage,
  oldItem?: TreeItem
): TreeItem {
  return {
    ...(oldItem ?? {}),
    id: id,
    children: page.childPages,
    data: page,
  };
}

export function useSidebarPageState() {
  const { pages, info, currentPageId, moveWikiPage } = useWikiPage();

  const initialized = useRef<boolean>(false);
  const [treePages, setTreePages] = useState<TreeData>(DEFAULT_STATE);

  useEffect(() => {
    setTreePages((prevPages) => ({
      rootId: "-1",
      items: addRootPageToItems(
        info.data?.rootPages ?? [],
        convertPagesToTreeItems(pages.data ?? {}, prevPages?.items)
      ),
    }));
  }, [pages, info]);

  useEffect(() => {
    if (pages.data && currentPageId && !initialized.current) {
      let pagesToExpand: string[] = [];
      const currentPage = pages.data[currentPageId];

      let pageIdToPush = currentPage.parentPage;
      while (pageIdToPush) {
        pagesToExpand.push(pageIdToPush);
        pageIdToPush = pages.data[pageIdToPush].parentPage;
      }
      setTreePages((prevPages) => {
        let newPages = { ...prevPages } as TreeData;
        pagesToExpand.forEach((pageId) => {
          newPages = mutateTree(newPages, pageId, { isExpanded: true });
        });
        return newPages;
      });
      initialized.current = true;
    }
  }, [currentPageId, pages]);

  const handleExpand = (itemId: ItemId) => {
    setTreePages(mutateTree(treePages, itemId, { isExpanded: true }));
  };

  const handleCollapse = (itemId: ItemId) => {
    setTreePages(mutateTree(treePages, itemId, { isExpanded: false }));
  };

  const onDragEnd = (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition
  ) => {
    const convertIdToString = (id: ItemId): string | undefined => {
      if (typeof id === "string" && id !== "-1") {
        return id;
      }
      return undefined;
    };

    if (!destination || !pages.data) return;
    const pageId: string =
      convertIdToString(
        treePages.items[source.parentId].children[source.index]
      ) ?? "";
    setTreePages((treePages) => moveItemOnTree(treePages, source, destination));
    moveWikiPage(
      pageId,
      {
        oldParentId: convertIdToString(source.parentId),
        oldIndex: source.index,
      },
      {
        newParentId: convertIdToString(destination.parentId),
        newIndex: destination.index,
      }
    );
  };

  return { treePages, handleExpand, handleCollapse, onDragEnd };
}
