import * as functions from "firebase-functions";
import * as firebaseTools from "firebase-tools";
import { getWikiAccess } from "../helpers/getWikiAccess";

interface IDeleteWikiPage {
  wikiId: string;
  pageId: string;
}

export const deleteWikiPage = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "2GB",
  })
  .https.onCall(async (data: IDeleteWikiPage, context) => {
    const { wikiId, pageId } = data;

    const wikiAccess = await getWikiAccess(context, wikiId);

    if (wikiAccess?.canDelete) {
      await firebaseTools.firestore.delete(`wikis/${wikiId}/pages/${pageId}`, {
        project: process.env.GCLOUD_PROJECT,
        recursive: true,
        yes: true,
        token: functions.config().fb.token,
      });

      return true;
    }
    return false;
  });
