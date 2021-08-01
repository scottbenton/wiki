import clsx from "clsx";
import { FullPageMessage } from "components/shared/FullPageMessage";
import { useRouter } from "next/router";
import { useLoadingFeedback } from "providers/FeedbackProvider";
import React from "react";
import { Header } from "./Header";

const pageTypeConfig = {
  centered: "flex items-center justify-center flex-grow p-4",
  row: "flex flex-grow",
  column: "flex flex-col flex-grow",
};

export interface PageLayoutProps {
  toolbarItems?: React.ReactNode;
  pageType?: keyof typeof pageTypeConfig;
  constrained?: boolean;
  className?: string;
  loading?: boolean;
  errorMessage?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = (props) => {
  const {
    toolbarItems,
    children,
    pageType,
    constrained,
    loading,
    errorMessage,
    className,
  } = props;

  const router = useRouter();
  useLoadingFeedback(router.pathname, loading ?? false);

  return (
    <div className={"flex flex-col min-h-screen max-h-screen"}>
      <Header>{toolbarItems}</Header>
      <div
        className={clsx(
          pageTypeConfig[errorMessage ? "centered" : pageType ?? "column"],
          className,
          constrained
            ? "mx-auto max-w-screen-xl px-4 py-4 lg:px-8 lg:py-8 w-full"
            : "",
          "overflow-auto relative"
        )}
      >
        {errorMessage ? (
          <FullPageMessage
            title={"Error Loading Page"}
            message={errorMessage}
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
};
