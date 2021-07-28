import { Card } from "components/shared/Card";
import { useWikiList } from "providers/WikiListProvider";
import React from "react";
import { WikiList } from "components/features/WikiList";
import { Button } from "components/shared/Button";
import { PageLayout } from "components/layout/PageLayout";

const WikiPage: React.FC = (props) => {
  const { wikiState } = useWikiList();
  const { data, loading, error } = wikiState;

  return (
    <PageLayout constrained>
      <Card className={"flex justify-between items-center px-4 py-3"}>
        <h1 className={"text-2xl font-semibold"}>Your Wikis</h1>
        <Button
          color={"primary"}
          variant={"contained"}
          id={"create-wiki"}
          href={"/wikis/create"}
        >
          Create Wiki
        </Button>
      </Card>
      <WikiList data={data} loading={loading} error={error} />
    </PageLayout>
  );
};

export default WikiPage;
