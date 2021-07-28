import React from "react";
import { Wiki } from "domain/Wiki";
import { Spinner } from "components/shared/Spinner";
import { useLoadingFeedback } from "providers/FeedbackProvider";
import { WikiCard } from "./WikiCard";
import { FullPageMessage } from "components/shared/FullPageMessage";
import { Button } from "components/shared/Button";

export interface WikiListProps {
  data?: { [key: string]: Wiki };
  error?: string;
  loading: boolean;
}
const loadingKey = "wikiList";
export const WikiList: React.FC<WikiListProps> = (props) => {
  const { data, error, loading } = props;

  useLoadingFeedback(loadingKey, loading);

  if (loading) {
    return (
      <div
        className={
          "flex flex-grow items-center justify-center content-center w-full"
        }
      >
        <Spinner diameter={82} className={"text-white"} />
      </div>
    );
  } else if (error) {
    return (
      <FullPageMessage
        className={"mt-16"}
        title={"Error Loading Wikis."}
        titleClassName={"text-white"}
        message={error}
        messageClassName={"text-primary-200"}
      />
    );
  } else if (!data || Object.keys(data).length === 0) {
    return (
      <FullPageMessage
        className={"mt-16"}
        title={"No Wikis Found"}
        titleClassName={"text-white"}
        message={"Create a new wiki to get started."}
        messageClassName={"text-primary-200"}
        actions={
          <>
            <Button variant={"contained"} id={"add-wiki-fpm"} color={"default"}>
              Create a new Wiki
            </Button>
          </>
        }
      />
    );
  } else {
    return (
      <div
        className={
          "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-4 lg:py-8"
        }
      >
        {Object.keys(data).map((wikiId) => (
          <WikiCard key={wikiId} wikiId={wikiId} wiki={data[wikiId]} />
        ))}
      </div>
    );
  }
};
