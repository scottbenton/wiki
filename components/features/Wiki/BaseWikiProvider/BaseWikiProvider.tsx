import { WikiCollectionName } from "domain/Wiki";
import { WikiPage, WikiPageSubCollectionName } from "domain/WikiPage";
import { DataState } from "hooks/useFBData";
import { firestore } from "lib/firebase";
import { useRouter } from "next/router";
import { useWikiList } from "providers/WikiListProvider";
import React, { useEffect, useState } from "react";
import { BaseWikiContext } from "./BaseWikiContext";

export const BaseWikiProvider: React.FC = (props) => {
  const { children } = props;

  const { wikiState, updateWiki } = useWikiList();

  const { query } = useRouter();
  const { wikiParams } = query;

  const [wikiId, setWikiId] = useState(
    Array.isArray(wikiParams) ? wikiParams[0] : ""
  );
  const [wikiPages, setWikiPages] = useState<
    DataState<{ [key: string]: WikiPage }>
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

  return (
    <BaseWikiContext.Provider
      value={{
        params: Array.isArray(wikiParams) ? wikiParams : [],
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
        updateWiki,
        pages: wikiPages,
        createPage,
      }}
    >
      {children}
    </BaseWikiContext.Provider>
  );
};
