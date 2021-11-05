import React, { useState, useEffect } from "react";
import { SidebarItem } from "../SidebarItem";
import AddPageIcon from "@heroicons/react/solid/DocumentAddIcon";
import { useWikiPage } from "../../../WikiPageProvider";
import { wikiPageConfig } from "../../../WikiPageConfig";
import { RenderItemParams } from "@atlaskit/tree";
import CreatePageIcon from "@heroicons/react/solid/PlusIcon";

export interface SidebarWikiPageProps extends RenderItemParams {}

export const SidebarWikiPage: React.FC<SidebarWikiPageProps> = (props) => {
  const { item, onExpand, onCollapse, provided, snapshot } = props;

  const { wikiId, createPage } = useWikiPage();

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <SidebarItem
        name={item.data?.title ?? item.id}
        collapsed={!item.isExpanded}
        handleCollapse={() => {
          item.isExpanded ? onCollapse(item.id) : onExpand(item.id);
        }}
        href={wikiPageConfig.viewPage.constructPath(
          wikiId,
          typeof item.id === "string" ? item.id : ""
        )}
        hasCollapseContent={item.children.length > 0}
        hoverAction={{
          Icon: CreatePageIcon,
          onClick: () => {
            if (typeof item.id === "string") {
              createPage(
                {
                  title: "New Page",
                  parentPage: item.id,
                  childPages: [],
                },
                item.id
              );
            }
          },
        }}
      />
    </div>
  );
};
