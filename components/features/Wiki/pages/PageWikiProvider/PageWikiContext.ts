import { createContext } from "react";
import { DataState } from "hooks/useFBData";
import { WikiPage } from "domain/WikiPage";
import { WikiPageContent } from "domain/WikiPageContent";
import { IBaseWikiContext } from "../../BaseWikiProvider";

interface IPageWikiContext extends IBaseWikiContext {
  currentPage?: WikiPage;
  currentPageId?: string;
  currentPageContent: DataState<WikiPageContent>;
  updatePage: (id: string, wikiPage: WikiPage) => void;
  deletePage: (id: string, wikiPage: WikiPage) => void;
  updatePageContent: (id: string, content: string) => void;
}

export const PageWikiContext = createContext<IPageWikiContext>({
  wikiId: "",
  currentPageId: "",
  info: { loading: true },
  pages: { loading: true },
  updateWiki: () => {},
  currentPageContent: { loading: true },
  createPage: () => {},
  updatePage: () => {},
  deletePage: () => {},
  updatePageContent: () => {},
  params: [],
});
