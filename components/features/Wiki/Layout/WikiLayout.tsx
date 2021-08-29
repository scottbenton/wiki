import { MobileSidebar, DesktopSidebar } from "./WikiSidebar";
import { WikiToolbar } from "./WikiToolbar";
import { PageLayout, PageLayoutProps } from "components/layout/PageLayout";
import React, { useEffect, useState } from "react";
import { useIsMobile } from "hooks/useIsMobile";
import { useWikiPage } from "../WikiPageProvider";
import clsx from "clsx";
import { useRouter } from "next/router";
import { Button } from "components/shared/Button";
import { wikiPageConfig } from "../WikiPageConfig";
import { useAuth } from "providers/AuthProvider";

const pageLayoutConfig = {
  centered: "flex items-center justify-center",
  column: "flex flex-col flex-grow",
  article: "flex flex-col prose-sm md:prose",
};

export type WikiLayouts = keyof typeof pageLayoutConfig;

export interface WikiPageProps {
  ToolbarItems?: React.FC;
  pageLayoutProps?: PageLayoutProps;
  layout?: WikiLayouts;
}

export const WikiPage: React.FC<WikiPageProps> = (props) => {
  const { children, ToolbarItems, pageLayoutProps, layout = "column" } = props;

  const { info, pages, currentPageId, wikiId } = useWikiPage();
  const { user } = useAuth();
  const router = useRouter();
  const path = router.asPath;

  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(
    isMobile ? false : true
  );

  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile, path]);

  let interpageError = undefined;
  if (pages.data && currentPageId && !pages.data[currentPageId]) {
    interpageError = "Wiki page no longer exists";
  }

  return (
    <PageLayout
      loading={info.loading || pages.loading}
      errorMessage={info.error || pages.error || interpageError}
      errorMessageProps={{
        actions: (
          <>
            <Button
              id={"wiki-list"}
              href={user ? "/wikis" : "/"}
              color={"primary"}
              variant={"outlined"}
            >
              Home
            </Button>
            {interpageError && (
              <Button
                id={"wiki-root"}
                href={wikiPageConfig.about.constructPath(wikiId)}
                color={"primary"}
                variant={"contained"}
              >
                Return to Wiki Root
              </Button>
            )}
          </>
        ),
      }}
      toolbarItems={
        <WikiToolbar
          toggleSidebar={() => setSidebarOpen((open) => !open)}
          ToolbarItems={ToolbarItems}
        />
      }
      pageType={"row"}
      {...pageLayoutProps}
    >
      {!(info.loading || pages.loading) && (
        <>
          {isMobile ? (
            <MobileSidebar open={sidebarOpen} />
          ) : (
            <DesktopSidebar open={sidebarOpen} />
          )}
          <div
            className={clsx(
              "flex-grow bg-white",
              isMobile && sidebarOpen ? "overflow-hidden" : "overflow-auto"
            )}
          >
            <div className={"w-full bg-white p-4 md:px-8"}>
              <article className={clsx(pageLayoutConfig[layout])}>
                {children}
              </article>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
};
