import { Wiki } from "domain/Wiki";
import React from "react";
import { Card } from "components/shared/Card";
import { WikiAvatar } from "./WikiAvatar";
import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import { wikiPageConfig } from "../Wiki/WikiPageConfig";

export interface WikiCardProps {
  wikiId: string;
  wiki: Wiki;
  className?: string;
}

export const WikiCard: React.FC<WikiCardProps> = (props) => {
  const { wikiId, wiki } = props;
  const { name, description } = wiki;

  return (
    <Card
      href={wikiPageConfig.about.constructPath(wikiId)}
      className={"overflow-hidden bg-gray-300 w-full h-full cursor-pointer"}
    >
      <section className={"flex h-full w-full"}>
        <div
          className={
            "flex flex-col align-start flex-grow overflow-hidden pl-4 py-4 h-full bg-white rounded-lg"
          }
        >
          <div className={"flex items-center"}>
            <WikiAvatar wikiId={wikiId} wikiName={name} />
            <h2 className={"text-xl font-semibold ml-2 truncate"}>{name}</h2>
          </div>
          <p className={"text-gray-700 mt-2 max-h-24 overflow-hidden"}>
            {description}
          </p>
        </div>
        <div
          className={"text-gray-700 flex-shrink-0 h-full flex items-center p-2"}
        >
          <ArrowCircleRightIcon width={24} />
        </div>
      </section>
    </Card>
  );
};
