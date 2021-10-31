import * as functions from "firebase-functions";
import * as firebaseTools from "firebase-tools";
import { getWikiAccess } from "../helpers/getWikiAccess";

export const deleteWiki = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "2GB",
  })
  .https.onCall(async (wikiId: string, context) => {
    const wikiAccess = await getWikiAccess(context, wikiId);

    if (wikiAccess?.canDelete) {
      await firebaseTools.firestore.delete(`wikis/${wikiId}`, {
        project: process.env.GCLOUD_PROJECT,
        recursive: true,
        yes: true,
        token: functions.config().fb.token,
      });

      return true;
    }
    return false;
  });
