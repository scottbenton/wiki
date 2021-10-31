import { Wiki } from "domain/Wiki";
import { DataState } from "domain/DataState";
import { createContext } from "react";

export interface WikiMap {
  [wikiId: string]: Wiki;
}

interface IWikiListContext {
  wikiState: DataState<WikiMap>;
  createWiki: (wiki: Wiki) => void;
  updateWiki: (id: string, wiki: Wiki) => void;
}

export const WikiListContext = createContext<IWikiListContext>({
  wikiState: { loading: true },
  createWiki: () => {},
  updateWiki: () => {},
});
