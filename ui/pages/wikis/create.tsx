import { Wiki } from "domain/Wiki";
import React from "react";
import { Card } from "components/shared/Card";
import { WikiForm } from "components/features/WikiList/WikiForm";
import { useWikiList } from "providers/WikiListProvider";
import { useRouter } from "next/router";
import { PageLayout } from "components/layout/PageLayout";

const CreateWikiPage: React.FC = (props) => {
  const { createWiki } = useWikiList();
  const router = useRouter();

  const handleWikiCreation = (wiki: Wiki) => {
    createWiki(wiki);
    router.push("/wikis");
  };

  return (
    <PageLayout pageType="centered">
      <Card className={"p-4 max-w-md w-full"}>
        <h1 className={"text-xl font-bold"}>Create a Wiki</h1>
        <WikiForm submitWiki={handleWikiCreation} />
      </Card>
    </PageLayout>
  );
};

export default CreateWikiPage;
