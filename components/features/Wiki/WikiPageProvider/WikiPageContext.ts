import { Wiki } from "domain/Wiki";
import { WikiPage } from "domain/WikiPage";
import { WikiPageContent } from "domain/WikiPageContent";
import { DataState } from "hooks/useFBData";
import { createContext } from "react";

export interface IWikiPageContext {
  wikiId: string;
  info: DataState<Wiki>;
  pages: DataState<{ [key: string]: WikiPage }>;

  currentPage?: WikiPage;
  currentPageId?: string;
  currentPageContent: DataState<WikiPageContent>;

  updateWiki: (id: string, wiki: Wiki) => void;
  deleteWiki: (id: string) => void;

  createPage: (newPage: WikiPage, parentPageId?: string) => void;
  updatePage: (pageId: string, wikiPage: WikiPage) => void;
  updatePageContent: (pageId: string, content: string) => void;
  deletePage: (pageId: string) => void;
}

export const WikiPageContext = createContext<IWikiPageContext>({
  wikiId: "",
  info: { loading: true },
  pages: { loading: true },
  currentPageContent: { loading: false },

  updateWiki: () => {},
  deleteWiki: () => {},

  createPage: () => {},
  updatePage: () => {},
  updatePageContent: () => {},
  deletePage: () => {},
});
