import { Wiki } from "domain/Wiki";
import { WikiPage } from "domain/WikiPage";
import { WikiPageContent } from "domain/WikiPageContent";
import { DataState } from "domain/DataState";
import { createContext } from "react";
import { FirebaseResponse } from "domain/FirebaseResponse";

export interface IWikiPageContext {
  wikiId: string;
  info: DataState<Wiki>;
  pages: DataState<{ [key: string]: WikiPage }>;

  currentPage?: WikiPage;
  currentPageId?: string;
  currentPageContent: DataState<WikiPageContent>;
  parentPageList: string[];

  updateWiki: (id: string, wiki: Wiki) => void;
  deleteWiki: (id: string) => void;

  createPage: (
    newPage: WikiPage,
    parentPageId?: string
  ) => Promise<FirebaseResponse<WikiPage>>;
  updatePage: (pageId: string, wikiPage: WikiPage) => void;
  updatePageContent: (pageId: string, content: string) => Promise<string>;
  deletePage: (pageId: string) => void;

  duplicatePage: (pageId: string) => Promise<string>;
  moveWikiPage: (
    pageId: string,
    oldPosition: { oldParentId?: string; oldIndex?: number },
    newPosition: { newParentId?: string; newIndex?: number }
  ) => void;
}

export const WikiPageContext = createContext<IWikiPageContext>({
  wikiId: "",
  info: { loading: true },
  pages: { loading: true },
  currentPageContent: { loading: false },

  parentPageList: [],

  updateWiki: () => {},
  deleteWiki: () => {},

  createPage: () => new Promise(() => {}),
  updatePage: () => {},
  updatePageContent: () => new Promise(() => {}),
  deletePage: () => {},

  duplicatePage: () => new Promise(() => {}),
  moveWikiPage: () => {},
});
