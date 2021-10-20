import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  onSnapshot,
  setDoc,
} from "@firebase/firestore";
import { WikiPageSubCollection } from "./WikiPage";
import { db } from "lib/firebase";
import { FirebaseResponse } from "./FirebaseResponse";
import { FirebaseError } from "@firebase/util";

export const WikiPageContentSubCollectionName = "content";
export const WikiPageContentSubCollection = (wikiId: string, pageId: string) =>
  collection(
    db,
    WikiPageSubCollection(wikiId).path,
    pageId,
    WikiPageContentSubCollectionName
  );

export interface WikiPageContent {
  content: string;
}

/**
 *
 * @param wikiId - the containing wiki for the page
 * @param pageId - the page whose content we want
 * @returns A reference to the page content
 */
export function getWikiPageContentRef(
  wikiId: string,
  pageId: string
): DocumentReference<WikiPageContent> {
  return doc(
    db,
    WikiPageContentSubCollection(wikiId, pageId).path,
    WikiPageContentSubCollectionName
  ) as DocumentReference<WikiPageContent>;
}

export function getWikiPageContent(
  wikiId: string,
  pageId: string
): Promise<FirebaseResponse<WikiPageContent>> {
  return new Promise((resolve, reject) => {
    getDoc(getWikiPageContentRef(wikiId, pageId))
      .then((document) => {
        const data = document.data();
        if (data) {
          resolve({ id: document.id, data });
        } else {
          reject("Document has no data.");
        }
      })
      .catch(reject);
  });
}

/**
 *
 * @param wikiId - id of the containing wiki
 * @param pageId - id of the page's content
 * @param observer - onValue and onError callback functions
 * @returns unsubscribe function for when watching is finished
 */
export function watchWikiPageContent(
  wikiId: string,
  pageId: string,
  observer: {
    onValue: (value: FirebaseResponse<WikiPageContent>) => void;
    onError?: (error: FirebaseError) => void;
  }
) {
  const { onValue, onError } = observer;
  return onSnapshot<WikiPageContent>(getWikiPageContentRef(wikiId, pageId), {
    next: (snapshot) => onValue({ id: snapshot.id, data: snapshot.data() }),
    error: onError,
  });
}

export function updateWikiPageContent(
  wikiId: string,
  pageId: string,
  content: string
): Promise<FirebaseResponse<WikiPageContent>> {
  return new Promise((resolve, reject) => {
    setDoc(getWikiPageContentRef(wikiId, pageId), { content })
      .then(() => {
        resolve({ id: pageId, data: { content } });
      })
      .catch(reject);
  });
}
