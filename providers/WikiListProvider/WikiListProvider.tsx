import { Wiki, WikiCollectionName } from "domain/Wiki";
import { useFBData } from "hooks/useFBData";
import { useAuth } from "providers/AuthProvider";
import React, { useEffect } from "react";
import { WikiListContext, WikiMap } from "./WikiListContext";
import { firestore } from "lib/firebase";
export const WikiListProvider: React.FC = (props) => {
  const { children } = props;

  const { user } = useAuth();
  const id = user?.uid;

  const { loadData, setErrorMessage, setLoading, ...wikiState } =
    useFBData<WikiMap>();

  useEffect(() => {
    let unsubscribe: () => void;

    if (id) {
      unsubscribe = firestore()
        .collection(WikiCollectionName)
        .where("userIds", "array-contains", id)
        .onSnapshot(
          (snapshot) => {
            let wikis: WikiMap = {};
            snapshot.docs.forEach((doc) => {
              wikis[doc.id] = doc.data() as Wiki;
            });
            loadData(wikis);
          },
          (error) => {
            console.error(error);
            setErrorMessage(error.message);
          }
        );
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [id]);

  const createWiki = (wiki: Wiki) => {
    firestore().collection(WikiCollectionName).add(wiki);
  };

  const updateWiki = async (id: string, wiki: Wiki) => {
    await firestore().collection(WikiCollectionName).doc(id).set(wiki);
  };

  return (
    <WikiListContext.Provider value={{ wikiState, createWiki, updateWiki }}>
      {children}
    </WikiListContext.Provider>
  );
};
