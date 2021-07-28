import { Wiki } from "domain/Wiki";
import { WikiPage } from "domain/WikiPage";
import { DataState } from "hooks/useFBData";
import React, { createContext } from "react";

export interface IBaseWikiContext {
  params: string[];
  wikiId: string;
  info: DataState<Wiki>;
  updateWiki: (id: string, wiki: Wiki) => void;
  pages: DataState<{ [key: string]: WikiPage }>;
  createPage: (newPage: WikiPage, parentPageId?: string) => void;
}

export const BaseWikiContext = createContext<IBaseWikiContext>({
  params: [],
  wikiId: "",
  info: { loading: true },
  updateWiki: () => {},
  pages: {
    loading: true,
  },
  createPage: () => {},
});
