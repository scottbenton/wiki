import { MobileSidebar, DesktopSidebar } from "./WikiSidebar";
import { WikiToolbar } from "./WikiToolbar";
import { PageLayout, PageLayoutProps } from "components/layout/PageLayout";
import React, { useEffect, useState } from "react";
import { useIsMobile } from "hooks/useIsMobile";
import { useWikiPage } from "../WikiPageProvider";
import clsx from "clsx";
import { useRouter } from "next/router";

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

  const { info, pages } = useWikiPage();
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

  return (
    <PageLayout
      loading={info.loading || pages.loading}
      errorMessage={info.error || pages.error}
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
