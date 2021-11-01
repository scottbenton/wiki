import {
  collection,
  doc,
  DocumentReference,
  setDoc,
} from "@firebase/firestore";
import { db } from "lib/firebase";
import { FirebaseResponse } from "./FirebaseResponse";

export const UserCollectionName = "users";
export const UserCollection = collection(db, UserCollectionName);

export interface User {
  avatarUrl?: string;
  displayName: string;
  email: string;
  uid: string;
}

/**
 *
 * @param userId - Id of the user reference to get
 * @returns A firestore reference to the document
 */
function getUserRef(userId: string) {
  return doc(db, UserCollectionName, userId) as DocumentReference<User>;
}

/**
 *
 * @param userId - The user id to update
 * @param user - The new user parameters to pass in
 * @returns a promise - resolves with the user or rejects with the reason
 */
export function updateUser(
  userId: string,
  user: User
): Promise<FirebaseResponse<User>> {
  return new Promise((resolve, reject) => {
    setDoc(getUserRef(userId), user)
      .then(() => {
        resolve({ id: userId, data: user });
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}
