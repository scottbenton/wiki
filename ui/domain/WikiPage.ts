import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  DocumentReference,
  getDocs,
  onSnapshot,
  Query,
  query,
  QuerySnapshot,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { FirebaseError } from "@firebase/util";
import { db } from "lib/firebase";
import { deleteWikiPage as delWikiPage } from "lib/functions";
import { FirebaseResponse } from "./FirebaseResponse";
import { WikiCollectionName } from "./Wiki";

export const WikiPageSubCollectionName = "pages";
export const WikiPageSubCollection = (wikiId: string) =>
  collection(db, WikiCollectionName, wikiId, WikiPageSubCollectionName);

export interface WikiPage {
  title: string;
  childPages: string[];
  parentPage?: string;
}
export interface WikiPageObject {
  [pageId: string]: WikiPage;
}

/**
 *
 * @param wikiId - The id of the wiki that contains the page
 * @param pageId - The id of the page
 * @returns A reference to the page
 */
export function getWikiPageRef(
  wikiId: string,
  pageId: string
): DocumentReference<WikiPage> {
  return doc(
    db,
    WikiPageSubCollection(wikiId).path,
    pageId
  ) as DocumentReference<WikiPage>;
}

/**
 *
 * @param wikiId - The id of the wiki
 * @param pageId - The id of the page to fetch
 * @returns Resolves with the page, or rejects with the error
 */
export function getWikiPage(
  wikiId: string,
  pageId: string
): Promise<FirebaseResponse<WikiPage>> {
  return new Promise((resolve, reject) => {
    getDoc(getWikiPageRef(wikiId, pageId))
      .then((document) => {
        const data = document.data();
        if (data) {
          resolve({ id: document.id, data });
        } else {
          reject("Document has no data.");
        }
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}

/**
 * Gets all the pages for a given wiki
 * @param wikiId - the id of the containing wiki
 * @returns all the pages present within said wiki
 */
export function getAllWikiPages(wikiId: string): Promise<WikiPageObject> {
  return new Promise((resolve, reject) => {
    const allQuery = query(WikiPageSubCollection(wikiId));
    getDocs(allQuery)
      .then((snapshot) => {
        let pages: WikiPageObject = {};
        snapshot.docs.forEach(
          (doc) => (pages[doc.id] = doc.data() as WikiPage)
        );
        resolve(pages);
      })
      .catch(reject);
  });
}

/**
 *
 * @param wikiId - The id of the containing wiki
 * @param pageId - The id of the page to watch
 * @param observer - Contains onValue and onError callback functions
 * @returns unsubscribe function for stopping watching
 */
export function watchWikiPage(
  wikiId: string,
  pageId: string,
  observer: {
    onValue: (value: FirebaseResponse<WikiPage>) => void;
    onError?: (error: FirebaseError) => void;
  }
) {
  const { onValue, onError } = observer;
  return onSnapshot<WikiPage>(getWikiPageRef(wikiId, pageId) as any, {
    next: (snapshot) =>
      onValue({ id: snapshot.id, data: snapshot.data() }) as any,
    error: onError as any,
  });
}

/**
 * Given a wiki, watches for changes in any of its pages
 * @param wikiId - The id of the containing wiki
 * @param observer - Contains onValue and onError callbacks
 * @returns a function to call to quit the watching process
 */
export function watchAllWikiPages(
  wikiId: string,
  observer: {
    onValue: (value: WikiPageObject) => void;
    onError?: (error: FirebaseError) => void;
  }
) {
  const { onValue, onError } = observer;
  const allQuery = query(WikiPageSubCollection(wikiId));
  return onSnapshot(
    allQuery as Query<WikiPage>,
    {
      next: (snapshot: QuerySnapshot<WikiPage>) => {
        let pages: WikiPageObject = {};
        snapshot.docs.forEach(
          (doc) => (pages[doc.id] = doc.data() as WikiPage)
        );
        onValue(pages);
      },
      error: onError,
    } as any
  );
}

/**
 *
 * @param wikiId - The id of the containing wiki
 * @param pageId - The id of the page to update
 * @param newPage - The new page values
 * @returns a promise, which resolves to the wiki if updated, or rejects with an error
 */
export function updateWikiPage(
  wikiId: string,
  pageId: string,
  newPage: WikiPage
): Promise<FirebaseResponse<WikiPage>> {
  return new Promise((resolve, reject) => {
    setDoc(getWikiPageRef(wikiId, pageId), newPage)
      .then(() => {
        resolve({ id: pageId, data: newPage });
      })
      .catch(reject);
  });
}

/**
 * Adds a page to a parent page
 * @param wikiId - The containing wiki
 * @param pageId - The page to add a child page to
 * @param childPageId - The id of the child page
 * @returns Resolves true if page is correctly added
 */
export function updateWikiPageAddChildPage(
  wikiId: string,
  pageId: string,
  childPageId: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    updateDoc(getWikiPageRef(wikiId, pageId), {
      childPages: arrayUnion(childPageId),
    })
      .then(() => {
        resolve(true);
      })
      .catch(reject);
  });
}

/**
 * Removes a page from a parent page
 * @param wikiId - The containing wiki
 * @param pageId - The page to remove a child page from
 * @param childPageId - The id of the child page to remove
 * @returns Resolves true if page is correctly removed
 */
export function updateWikiPageRemoveChildPage(
  wikiId: string,
  pageId: string,
  childPageId: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    updateDoc(getWikiPageRef(wikiId, pageId), {
      childPages: arrayRemove(childPageId),
    })
      .then(() => {
        resolve(true);
      })
      .catch(reject);
  });
}

/**
 *
 * @param wikiId - The id of the wiki
 * @param newPage - The new page to add
 * @returns resolves with the new page or rejects with the error
 */
export function createWikiPage(
  wikiId: string,
  newPage: WikiPage
): Promise<FirebaseResponse<WikiPage>> {
  return new Promise((resolve, reject) => {
    addDoc(WikiPageSubCollection(wikiId), newPage)
      .then((document) => {
        resolve({
          id: document.id,
          data: newPage,
        });
      })
      .catch(reject);
  });
}

/**
 * Deletes the wiki page and all underlying sub collections
 * @param wikiId - The id of the wiki
 * @param pageId - The id of the page to delete
 * @returns resolves true if deletion was successful, or rejects with the error
 */
export function deleteWikiPage(
  wikiId: string,
  pageId: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    delWikiPage({ wikiId, pageId })
      .then((value) => {
        resolve(true);
      })
      .catch(reject);
  });
}
