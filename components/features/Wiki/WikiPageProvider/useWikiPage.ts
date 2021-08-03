import { useContext } from "react";
import { WikiPageContext } from "./WikiPageContext";

export function useWikiPage() {
  return useContext(WikiPageContext);
}
