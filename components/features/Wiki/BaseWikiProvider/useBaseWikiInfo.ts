import { useContext } from "react";
import { BaseWikiContext } from "./BaseWikiContext";

export function useBaseWikiInfo() {
  return useContext(BaseWikiContext);
}
