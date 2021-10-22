import {
  updateWikiAddChildPage,
  updateWikiRemoveChildPage,
  deleteWiki as delWiki,
} from "domain/Wiki";
import {
  createWikiPage,
  deleteWikiPage,
  updateWikiPage,
  updateWikiPageAddChildPage,
  updateWikiPageRemoveChildPage,
  watchAllWikiPages,
  WikiPage,
  WikiPageObject,
} from "domain/WikiPage";
import {
  getWikiPageContent,
  updateWikiPageContent,
  WikiPageContent,
} from "domain/WikiPageContent";
import { DataState } from "domain/DataState";
import { useRouter } from "next/router";
import { useAuth } from "providers/AuthProvider";
import { useWikiList } from "providers/WikiListProvider";
import React, { useEffect, useState } from "react";
import { WikiPageContext } from "./WikiPageContext";
import { DocumentReference } from "@firebase/firestore";
import { FirebaseResponse } from "domain/FirebaseResponse";

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

  const [wikiPages, setWikiPages] = useState<DataState<WikiPageObject>>({
    loading: true,
  });

  const pageId =
    Array.isArray(wikiParams) && wikiParams.length > 1 ? wikiParams[2] : "";
  const page = wikiPages.data && wikiPages.data[pageId];

  const [parentPageList, setParentPageList] = useState<string[]>([]);

  useEffect(() => {
    if (pageId && wikiPages.data && wikiPages.data[pageId]) {
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
      unsubscribe = watchAllWikiPages(wikiId, {
        onValue: (value) => setWikiPages({ loading: false, data: value }),
        onError: (error) =>
          setWikiPages({ loading: false, error: error.message }),
      });
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

    if (wikiId && pageId) {
      getWikiPageContent(wikiId, pageId)
        .then((content) => {
          setPageContentState({
            loading: false,
            data: content.data,
          });
        })
        .catch((error) => {
          setPageContentState({
            loading: false,
            error:
              typeof error === "string"
                ? error
                : error?.message || "Error loading page content.",
          });
        });
    }
  }, [wikiId, pageId]);

  const deleteWiki = async (wikiId: string) => {
    if (wikiState.data && wikiState.data[wikiId] && user) {
      const wikiToDelete = wikiState.data[wikiId];

      if (wikiToDelete.userRoles[user.uid].canDelete) {
        await delWiki(wikiId);
      }
    }
  };

  const createPage = (wikiPage: WikiPage, parentPageId?: string) =>
    new Promise<FirebaseResponse<WikiPage>>((resolve, reject) => {
      if (wikiId) {
        createWikiPage(wikiId, wikiPage)
          .then((newDoc) => {
            if (parentPageId) {
              updateWikiPageAddChildPage(wikiId, parentPageId, newDoc.id);
            } else {
              updateWikiAddChildPage(wikiId, newDoc.id);
            }
            resolve(newDoc);
          })
          .catch((e) => {
            reject(e);
          });
      } else {
        reject("Wiki not found");
      }
    });

  const updatePage = async (pageId: string, wikiPage: WikiPage) => {
    updateWikiPage(wikiId, pageId, wikiPage);
  };

  const deletePage = async (pageId: string) => {
    if (wikiPages.data && wikiPages.data[pageId]) {
      const parentPageId = wikiPages.data[pageId].parentPage;
      deleteWikiPage(wikiId, pageId).then(() => {
        if (parentPageId) {
          updateWikiPageRemoveChildPage(wikiId, parentPageId, pageId);
        } else {
          updateWikiRemoveChildPage(wikiId, pageId);
        }
      });
    }
  };

  const updatePageContent = (pageId: string, content: string) =>
    new Promise<string>((resolve, reject) => {
      setPageContentState({
        loading: true,
      });
      updateWikiPageContent(wikiId, pageId, content)
        .then((data) => {
          setPageContentState({
            loading: false,
            data: { content: data.data?.content ?? "" },
          });
          resolve(data.data?.content || "");
        })
        .catch((error) => {
          setPageContentState({
            loading: false,
            error:
              typeof error === "string"
                ? error
                : error?.message || "Error updating page content.",
          });
          reject(error);
        });
    });

  const duplicatePage = (pageId: string) =>
    new Promise<string>((resolve, reject) => {
      if (wikiPages.data) {
        const page = wikiPages.data[pageId];

        let newPage: WikiPage = {
          parentPage: page.parentPage,
          title: page.title,
          childPages: [],
        };

        createPage(newPage, page.parentPage)
          .then((pageDoc) => {
            const newId = pageDoc.id;
            getWikiPageContent(wikiId, pageId)
              .then((contentResponse) => {
                updatePageContent(newId, contentResponse.data?.content ?? "")
                  .then(() => {
                    resolve(newId);
                  })
                  .catch(reject);
              })
              .catch(reject);
          })
          .catch(reject);
      } else {
        reject("Data is not loaded");
      }
    });

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

        duplicatePage,
      }}
    >
      {children}
    </WikiPageContext.Provider>
  );
};
