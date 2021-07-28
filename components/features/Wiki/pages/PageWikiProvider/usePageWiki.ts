import { PageWikiContext } from "./PageWikiContext";
import { useContext } from "react";

export function usePageWiki() {
  return useContext(PageWikiContext);
}
