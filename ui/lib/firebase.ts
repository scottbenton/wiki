import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getFunctions, Functions } from "firebase/functions";

const credentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

class Firebase {
  private app: FirebaseApp;
  private fbDB: Firestore;
  private fbAuth: Auth;
  private fbFunctions: Functions;

  constructor() {
    this.app = initializeApp(credentials);
    this.fbDB = getFirestore();
    this.fbAuth = getAuth();
    this.fbFunctions = getFunctions();
  }

  get db() {
    return this.fbDB;
  }
  get auth() {
    return this.fbAuth;
  }
  get functions() {
    return this.fbFunctions;
  }
}

export const firebase = new Firebase();
Object.freeze(firebase);

export const db = firebase.db;
export const auth = firebase.auth;
export const functions = firebase.functions;
