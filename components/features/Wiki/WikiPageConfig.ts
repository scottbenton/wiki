import React from "react";
import { About, AboutToolbarItems } from "./about";
import { Edit } from "./edit";
import { WikiLayouts } from "./Layout";
import { ViewWikiPage, ViewWikiPageToolbar, EditWikiPage } from "./pages";
import { PageWikiProvider } from "./pages/PageWikiProvider";

interface Config {
  matchRegex: RegExp;
  ToolbarItems?: React.FC;
  Component: React.FC;
  Wrapper?: React.FC;
  constructPath: (wikiId: string, pathId?: string) => string;
  layout?: WikiLayouts;
}

const constructBasePath = (wikiId: string) => `/wiki/${wikiId}`;

export const wikiPageConfig: {
  [key: string]: Config;
} = {
  about: {
    matchRegex: /wiki\/[a-zA-Z0-9]*[\/]?$/gi,
    Component: About,
    ToolbarItems: AboutToolbarItems,
    constructPath: (wikiId) => constructBasePath(wikiId),
    layout: "article",
  },
  edit: {
    matchRegex: /wiki\/([a-zA-Z0-9])*\/edit\/?$/gi,
    Component: Edit,
    constructPath: (wikiId) => constructBasePath(wikiId) + "/edit",
  },
  viewPage: {
    matchRegex: /wiki\/([a-zA-Z0-9])*\/page\/([a-zA-Z0-9])*\/?$/gi,
    Wrapper: PageWikiProvider,
    Component: ViewWikiPage,
    constructPath: (wikiId, pathId) =>
      constructBasePath(wikiId) + "/page/" + pathId,
    ToolbarItems: ViewWikiPageToolbar,
    layout: "article",
  },
  editPage: {
    matchRegex: /wiki\/([a-zA-Z0-9])*\/page\/([a-zA-Z0-9])*\/edit\/?$/gi,
    Wrapper: PageWikiProvider,
    Component: EditWikiPage,
    constructPath: (wikiId, pathId) =>
      constructBasePath(wikiId) + "/page/" + pathId + "/edit",
  },
};
