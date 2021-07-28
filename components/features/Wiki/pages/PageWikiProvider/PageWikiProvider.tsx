import React, { useEffect, useState } from "react";
import { PageWikiContext } from "./PageWikiContext";
import { WikiPage, WikiPageSubCollectionName } from "domain/WikiPage";
import { DataState } from "hooks/useFBData";
import {
  WikiPageContent,
  WikiPageContentSubCollectionName,
} from "domain/WikiPageContent";
import { firestore } from "lib/firebase";
import { WikiCollectionName } from "domain/Wiki";
import { useBaseWikiInfo } from "../../BaseWikiProvider";
import { useRouter } from "next/router";

export const PageWikiProvider: React.FC = (props) => {
  const { children } = props;

  const wikiState = useBaseWikiInfo();
  const { wikiId, pages } = wikiState;

  const { query } = useRouter();
  const { wikiParams } = query;

  const pageId =
    Array.isArray(wikiParams) && wikiParams.length > 1 ? wikiParams[2] : "";
  const page = pages.data && pages.data[pageId];

  const [pageContentState, setPageContentState] = useState<
    DataState<WikiPageContent>
  >({ loading: true });

  useEffect(() => {
    setPageContentState(
      wikiId && pageId ? { loading: true } : { loading: false }
    );

    let unsubscribe: () => void;
    if (wikiId && pageId) {
      unsubscribe = firestore()
        .collection(WikiCollectionName)
        .doc(wikiId)
        .collection(WikiPageSubCollectionName)
        .doc(pageId)
        .collection(WikiPageContentSubCollectionName)
        .doc(WikiPageContentSubCollectionName)
        .onSnapshot(
          (snapshot) => {
            setPageContentState({
              loading: false,
              data: snapshot.data() as WikiPageContent,
            });
          },
          (error) => {
            setPageContentState({
              loading: false,
              error: error.message,
            });
          }
        );
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [wikiId, pageId]);

  const updatePage = (pageId: string, wikiPage: WikiPage) => {
    firestore()
      .collection(WikiCollectionName)
      .doc(wikiId)
      .collection(WikiPageSubCollectionName)
      .doc(pageId)
      .set(wikiPage);
  };

  const deletePage = (pageId: string, wikiPage: WikiPage) => {
    firestore()
      .collection(WikiCollectionName)
      .doc(wikiId)
      .collection(WikiPageSubCollectionName)
      .doc(pageId)
      .delete();
  };

  const updatePageContent = (pageId: string, content: string) => {
    firestore()
      .collection(WikiCollectionName)
      .doc(wikiId)
      .collection(WikiPageSubCollectionName)
      .doc(pageId)
      .collection(WikiPageContentSubCollectionName)
      .doc("content")
      .set({ content: content });
  };

  return (
    <PageWikiContext.Provider
      value={{
        ...wikiState,
        currentPage: page,
        currentPageId: pageId,
        currentPageContent: pageContentState,
        updatePage,
        deletePage,
        updatePageContent,
      }}
    >
      {children}
    </PageWikiContext.Provider>
  );
};
