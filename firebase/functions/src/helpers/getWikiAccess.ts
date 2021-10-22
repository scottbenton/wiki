import { firestore } from "firebase-admin";
import { CallableContext } from "firebase-functions/v1/https";

export async function getWikiAccess(
  context: CallableContext,
  wikiId: string
): Promise<
  { canRead: boolean; canWrite: boolean; canDelete: boolean } | undefined
> {
  const uid = context.auth?.token?.uid;
  if (uid) {
    const doc = await (
      await firestore().collection("wikis").doc(wikiId).get()
    ).data();

    if (doc?.userRoles) {
      return doc.userRoles[uid];
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}
