import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const credentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

export function initializeApp() {
  if (!firebase.apps.length) {
    firebase.initializeApp(credentials);
  }
}

export function firestore() {
  initializeApp();
  return firebase.firestore();
}

export function auth() {
  initializeApp();
  return firebase.auth();
}

export function googleAuthProvider() {
  return new firebase.auth.GoogleAuthProvider();
}

export interface User extends firebase.User {}
