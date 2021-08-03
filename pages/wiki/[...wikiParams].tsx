import { wikiPageConfig } from "components/features/Wiki/WikiPageConfig";
import { useRouter } from "next/router";
import React from "react";
import { WikiPageProvider } from "components/features/Wiki/WikiPageProvider";
import { WikiPage } from "components/features/Wiki/Layout";

const WikiBasePage: React.FC = (props) => {
  const router = useRouter();

  const page = Object.values(wikiPageConfig).find((config) =>
    router.asPath.match(config.matchRegex)
  );
  if (page) {
    const { Component, ToolbarItems, layout } = page;
    return (
      <WikiPageProvider>
        <WikiPage ToolbarItems={ToolbarItems} layout={layout}>
          <Component />
        </WikiPage>
      </WikiPageProvider>
    );
  }
  return <>Wiki</>;
};

export default WikiBasePage;
