import { WikiSidebar } from "./WikiSidebar";
import { WikiToolbar } from "./WikiToolbar";
import { PageLayout, PageLayoutProps } from "components/layout/PageLayout";
import React, { useEffect, useState } from "react";
import { useIsMobile } from "hooks/useIsMobile";
import { useBaseWikiInfo } from "../BaseWikiProvider";
import clsx from "clsx";

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

  const { info, pages } = useBaseWikiInfo();

  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(
    isMobile ? false : true
  );

  useEffect(() => {
    setSidebarOpen(isMobile ? false : true);
  }, [isMobile]);

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
          <WikiSidebar open={sidebarOpen} />
          <div className={"flex-grow overflow-auto bg-white"}>
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
