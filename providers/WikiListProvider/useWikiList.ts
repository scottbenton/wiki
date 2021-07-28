import { useContext } from "react";
import { WikiListContext } from "./WikiListContext";

export function useWikiList() {
  return useContext(WikiListContext);
}
