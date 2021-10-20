import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  DocumentReference,
  FirestoreError,
  getDoc,
  onSnapshot,
  Query,
  query,
  setDoc,
  updateDoc,
  where,
} from "@firebase/firestore";
import { deleteWiki as delWiki } from "lib/functions";
import { FirebaseError } from "@firebase/util";
import { db } from "lib/firebase";
import { FirebaseResponse } from "./FirebaseResponse";
import { UserRoles } from "./UserRoles";

export const WikiCollectionName = "wikis";
export const WikiCollection = collection(db, WikiCollectionName);

export interface Wiki {
  name: string;
  description?: string;
  userIds: string[];
  userRoles: {
    [id: string]: UserRoles;
  };
  rootPages: string[];
}

export interface WikiObject {
  [key: string]: Wiki;
}

/**
 *
 * @param wikiId - the wiki id to get a reference to
 * @returns Returns a reference to the wiki
 */
export function getWikiRef(wikiId: string) {
  return doc(db, WikiCollectionName, wikiId) as DocumentReference<Wiki>;
}

/**
 *
 * @param wikiId the wiki id to fetch
 * @returns Resolves with the wiki, or rejects with an error
 */
export function getWiki(wikiId: string): Promise<FirebaseResponse<Wiki>> {
  return new Promise((resolve, reject) => {
    getDoc(getWikiRef(wikiId))
      .then((document) => {
        const data = document.data();
        if (data) {
          resolve({ id: document.id, data });
        } else {
          reject("Document has no data.");
        }
      })
      .catch((error) => reject(error));
  });
}

/**
 *
 * @param wikiId the wiki to watch
 * @param observer - takes two functions: onValue, and onError that handle data
 * @returns unsubscribe function for use for unsubscribing
 */
export function watchWiki(
  wikiId: string,
  observer: {
    onValue: (value: FirebaseResponse<Wiki>) => void;
    onError?: (error: FirestoreError) => void;
  }
) {
  const { onValue, onError } = observer;
  return onSnapshot<Wiki>(getWikiRef(wikiId), {
    next: (snapshot) => onValue({ id: snapshot.id, data: snapshot.data() }),
    error: onError,
  });
}

export function watchUsersWikis(
  userId: string,
  observer: {
    onValue: (value: WikiObject) => void;
    onError?: (error: FirebaseError) => void;
  }
) {
  const { onValue, onError } = observer;

  const userQuery = query(
    WikiCollection,
    where("userIds", "array-contains", userId)
  ) as Query<Wiki>;

  return onSnapshot<Wiki>(userQuery, {
    next: (snapshot) => {
      let wikis: WikiObject = {};
      snapshot.docs.forEach((doc) => {
        wikis[doc.id] = doc.data() as Wiki;
      });
      onValue(wikis);
    },
    error: onError,
  });
}

/**
 *
 * @param wikiId - the wiki to update
 * @param newWiki - the changes to pass
 * @returns a promise, which resolves to the wiki if update is successful
 */
export function updateWiki(
  wikiId: string,
  newWiki: Wiki
): Promise<FirebaseResponse<Wiki>> {
  return new Promise((resolve, reject) => {
    setDoc(getWikiRef(wikiId), newWiki)
      .then(() => {
        resolve({ id: wikiId, data: newWiki });
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}

/**
 * Adds a page to a wiki
 * @param wikiId - The wiki to add a page to
 * @param childPageId - The id of the child page
 * @returns Resolves true if page is correctly added
 */
export function updateWikiAddChildPage(
  wikiId: string,
  childPageId: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    updateDoc(getWikiRef(wikiId), {
      rootPages: arrayUnion(childPageId),
    })
      .then(() => {
        resolve(true);
      })
      .catch(reject);
  });
}

/**
 * Removes a page from the wiki
 * @param wikiId - The containing wiki to remove a page from
 * @param childPageId - The id of the child page to remove
 * @returns Resolves true if page is correctly removed
 */
export function updateWikiRemoveChildPage(
  wikiId: string,
  childPageId: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    updateDoc(getWikiRef(wikiId), {
      rootPages: arrayRemove(childPageId),
    })
      .then(() => {
        resolve(true);
      })
      .catch(reject);
  });
}

/**
 *
 * @param newWiki - the data for the next wiki to add
 * @returns resolves with the new wikis data or rejects with the error
 */
export function createWiki(newWiki: Wiki): Promise<FirebaseResponse<Wiki>> {
  return new Promise((resolve, reject) => {
    addDoc(WikiCollection, newWiki)
      .then((data) => {
        resolve({
          id: data.id,
          data: newWiki,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 *
 * @param wikiId - the id of the wiki to delete
 * @returns resolves true if deletion is successful or rejects with the error
 */
export function deleteWiki(wikiId: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    delWiki(wikiId)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
