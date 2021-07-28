import { useContext } from "react";
import { FeedbackContext } from "./FeedbackContext";

export function useFeedback() {
  return useContext(FeedbackContext);
}
