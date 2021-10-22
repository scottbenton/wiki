import { httpsCallable } from "@firebase/functions";
import { functions } from "./firebase";

export const deleteWiki = httpsCallable(functions, "deleteWiki");
export const deleteWikiPage = httpsCallable(functions, "deleteWikiPage");
