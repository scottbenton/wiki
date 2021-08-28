import { WikiCollectionName } from "domain/Wiki";
import { WikiPage, WikiPageSubCollectionName } from "domain/WikiPage";
import {
  WikiPageContent,
  WikiPageContentSubCollectionName,
} from "domain/WikiPageContent";
import { DataState } from "hooks/useFBData";
import { firestore } from "lib/firebase";
import { useRouter } from "next/router";
import { useAuth } from "providers/AuthProvider";
import { useWikiList } from "providers/WikiListProvider";
import React, { useEffect, useState } from "react";
import { WikiPageContext } from "./WikiPageContext";

export const WikiPageProvider: React.FC = (props) => {
  const { children } = props;

  const { user } = useAuth();
  const { wikiState, updateWiki } = useWikiList();

  const { query } = useRouter();
  const { wikiParams } = query;

  const [wikiId, setWikiId] = useState(
    Array.isArray(wikiParams) ? wikiParams[0] : ""
  );
  const currentWiki = wikiState.data && wikiState.data[wikiId];

  const [wikiPages, setWikiPages] = useState<
    DataState<{ [key: string]: WikiPage }>
  >({ loading: true });

  const pageId =
    Array.isArray(wikiParams) && wikiParams.length > 1 ? wikiParams[2] : "";
  const page = wikiPages.data && wikiPages.data[pageId];

  const [parentPageList, setParentPageList] = useState<string[]>([]);

  useEffect(() => {
    if (pageId && wikiPages.data) {
      let list = [];

      let currentNode = wikiPages.data[pageId].parentPage;

      while (currentNode) {
        list.push(currentNode);
        currentNode = wikiPages.data[currentNode].parentPage;
      }

      setParentPageList(list);
    } else {
      setParentPageList([]);
    }
  }, [pageId, wikiPages]);

  const [pageContentState, setPageContentState] = useState<
    DataState<WikiPageContent>
  >({ loading: true });

  useEffect(() => {
    setWikiPages({ loading: true });

    let unsubscribe: () => void;
    if (wikiId) {
      unsubscribe = firestore()
        .collection(WikiCollectionName)
        .doc(wikiId)
        .collection(WikiPageSubCollectionName)
        .onSnapshot(
          (snapshot) => {
            let docs: { [id: string]: WikiPage } = {};

            snapshot.docs.forEach((doc) => {
              docs[doc.id] = doc.data() as WikiPage;
            });

            setWikiPages({
              loading: false,
              data: docs,
            });
          },
          (error) => {
            setWikiPages({
              loading: false,
              error: error.message,
            });
          }
        );
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [wikiId]);

  useEffect(() => {
    if (Array.isArray(wikiParams)) {
      setWikiId(wikiParams[0]);
    } else {
      setWikiId("");
    }
  }, [wikiParams]);

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

  const deleteWiki = async (wikiId: string) => {
    if (wikiState.data && wikiState.data[wikiId] && user) {
      const wikiToDelete = wikiState.data[wikiId];

      if (wikiToDelete.userRoles[user.uid].canDelete) {
        const promises = wikiToDelete.rootPages.map((pageId) =>
          deletePage(pageId)
        );

        await Promise.all(promises);

        await firestore().collection(WikiCollectionName).doc(wikiId).delete();
      }
    }
  };

  const createPage = (wikiPage: WikiPage, parentPageId?: string) => {
    if (wikiId) {
      firestore()
        .collection(WikiCollectionName)
        .doc(wikiId)
        .collection(WikiPageSubCollectionName)
        .add(wikiPage)
        .then((doc) => {
          const newId = doc.id;

          if (parentPageId && wikiPages.data && wikiPages.data[parentPageId]) {
            let parentDoc = { ...wikiPages.data[parentPageId] };
            parentDoc.childPages = [...parentDoc.childPages, newId];

            firestore()
              .collection(WikiCollectionName)
              .doc(wikiId)
              .collection(WikiPageSubCollectionName)
              .doc(parentPageId)
              .set(parentDoc);
          } else if (wikiState.data && wikiState.data[wikiId]) {
            let newWiki = { ...wikiState.data[wikiId] };
            newWiki.rootPages = [...newWiki.rootPages, newId];

            updateWiki(wikiId, newWiki);
          }
        });
    }
  };

  const updatePage = async (pageId: string, wikiPage: WikiPage) => {
    await firestore()
      .collection(WikiCollectionName)
      .doc(wikiId)
      .collection(WikiPageSubCollectionName)
      .doc(pageId)
      .set(wikiPage);
  };

  const deletePage = async (pageId: string) => {
    if (wikiPages.data && wikiPages.data[pageId] && currentWiki) {
      const parentPageId = wikiPages.data[pageId].parentPage;
      await deletePageRecursive(pageId);

      if (parentPageId) {
        const parentPage = wikiPages.data[parentPageId];
        let updatedParentPage = { ...parentPage };
        updatedParentPage.childPages = updatedParentPage.childPages.filter(
          (childId) => childId !== pageId
        );

        await updatePage(parentPageId, updatedParentPage);
      } else {
        let updatedWiki = { ...currentWiki };
        updatedWiki.rootPages = updatedWiki.rootPages.filter(
          (childId) => childId !== pageId
        );

        await updateWiki(wikiId, updatedWiki);
      }
    }
  };

  const deletePageRecursive = async (pageId: string) => {
    const pageToDelete = wikiPages.data && wikiPages.data[pageId];
    if (pageToDelete) {
      const promiseArray = pageToDelete.childPages.map((childPageId) =>
        deletePageRecursive(childPageId)
      );
      await Promise.all(promiseArray);
      await firestore()
        .collection(WikiCollectionName)
        .doc(wikiId)
        .collection(WikiPageSubCollectionName)
        .doc(pageId)
        .collection(WikiPageContentSubCollectionName)
        .doc(WikiPageContentSubCollectionName)
        .delete();

      await firestore()
        .collection(WikiCollectionName)
        .doc(wikiId)
        .collection(WikiPageSubCollectionName)
        .doc(pageId)
        .delete();
    }
    return 0;
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
    <WikiPageContext.Provider
      value={{
        wikiId: wikiId,
        info: {
          loading: wikiState.loading,
          data: wikiState.data && wikiState.data[wikiId],
          error:
            wikiState.error ||
            (!wikiState.loading && wikiState.data && !wikiState.data[wikiId]
              ? `Wiki with id ${wikiId} not found.`
              : undefined),
        },
        pages: wikiPages,

        currentPage: page,
        currentPageId: pageId,
        currentPageContent: pageContentState,
        parentPageList,

        updateWiki,
        deleteWiki,

        createPage,
        updatePage,
        updatePageContent,
        deletePage,
      }}
    >
      {children}
    </WikiPageContext.Provider>
  );
};
