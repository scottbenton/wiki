import { wikiPageConfig } from "components/features/Wiki/WikiPageConfig";
import { useRouter } from "next/router";
import React from "react";
import { WikiPageProvider } from "components/features/Wiki/WikiPageProvider";
import { WikiPage } from "components/features/Wiki/Layout";
import { PageLayout } from "components/layout/PageLayout";
import { Button } from "components/shared/Button";
import { useAuth } from "providers/AuthProvider";
const WikiBasePage: React.FC = (props) => {
  const { user } = useAuth();
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
  return (
    <PageLayout
      pageType={"centered"}
      errorMessage={"Page Not Found"}
      errorMessageProps={{
        message: "Please follow one of the following links.",
        actions: (
          <>
            <Button
              id={"navigate-home"}
              href={"/"}
              variant={"outlined"}
              color="primary"
            >
              Home
            </Button>
            {user && (
              <Button
                id={"navigate-wikis"}
                href={"/wikis"}
                variant={"contained"}
                color={"primary"}
              >
                Your Wikis
              </Button>
            )}
          </>
        ),
      }}
    />
  );
};

export default WikiBasePage;
