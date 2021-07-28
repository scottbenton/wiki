import { wikiPageConfig } from "components/features/Wiki/WikiPageConfig";
import { useRouter } from "next/router";
import React from "react";
import { BaseWikiProvider } from "components/features/Wiki/BaseWikiProvider";
import { WikiPage } from "components/features/Wiki/Layout";

const WikiBasePage: React.FC = (props) => {
  const router = useRouter();

  const page = Object.values(wikiPageConfig).find((config) =>
    router.asPath.match(config.matchRegex)
  );
  if (page) {
    const { Component, Wrapper, ToolbarItems, layout } = page;
    const PageWrapper: React.FC = (props) =>
      Wrapper ? <Wrapper>{props.children}</Wrapper> : <>{props.children}</>;
    return (
      <BaseWikiProvider>
        <WikiPage ToolbarItems={ToolbarItems} layout={layout}>
          <PageWrapper>
            <Component />
          </PageWrapper>
        </WikiPage>
      </BaseWikiProvider>
    );
  }
  return <>Wiki</>;
};

export default WikiBasePage;
