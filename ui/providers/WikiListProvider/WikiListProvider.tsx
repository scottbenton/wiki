import {
  Wiki,
  WikiCollectionName,
  watchUsersWikis,
  WikiObject,
  createWiki,
  updateWiki,
} from "domain/Wiki";
import { useFBData } from "hooks/useFBData";
import { useAuth } from "providers/AuthProvider";
import React, { useEffect } from "react";
import { WikiListContext, WikiMap } from "./WikiListContext";

export const WikiListProvider: React.FC = (props) => {
  const { children } = props;

  const { user } = useAuth();
  const id = user?.uid;

  const { loadData, setErrorMessage, setLoading, ...wikiState } =
    useFBData<WikiObject>();

  useEffect(() => {
    let unsubscribe: () => void;

    if (id) {
      unsubscribe = watchUsersWikis(id, {
        onValue: (wikis) => loadData(wikis),
        onError: (error) => {
          console.error(error);
          setErrorMessage(error.message);
        },
      });
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [id]);

  const createNewWiki = async (wiki: Wiki) => {
    await createWiki(wiki);
  };

  const updateExistingWiki = async (id: string, wiki: Wiki) => {
    await updateWiki(id, wiki);
  };

  return (
    <WikiListContext.Provider
      value={{
        wikiState,
        createWiki: createNewWiki,
        updateWiki: updateExistingWiki,
      }}
    >
      {children}
    </WikiListContext.Provider>
  );
};
