import { useRouter } from "next/router";
import { useWikiList } from "providers/WikiListProvider";

export function useWikiPageState() {
  const router = useRouter();
  const { wikiParams } = router.query;

  let wikiId;
  let wikiAction;
  let pathId;
  let pathAction;

  if (Array.isArray(wikiParams)) {
    if (wikiParams.length > 0) {
      wikiId = wikiParams[0];
    }
    if (wikiParams.length > 1) {
      wikiAction = wikiParams[1];
    }
    if (wikiParams.length > 2) {
      pathId = wikiParams[2];
    }
    if (wikiParams.length > 3) {
      pathAction = wikiParams[3];
    }
  }

  const { wikiState, createWiki, ...wikiContext } = useWikiList();
  const { loading, data, error } = wikiState;

  const wiki = data && wikiId && data[wikiId];

  const wikiNotFoundError =
    data && !wiki ? `Wiki with id ${wikiId} could not be found` : undefined;

  return {
    wiki,
    wikiId,
    wikiAction,
    pathId,
    pathAction,
    loading,
    error: error ?? wikiNotFoundError,
    ...wikiContext,
  };
}
