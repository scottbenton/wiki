import { useContext, useEffect } from "react";
import { FeedbackContext } from "./FeedbackContext";

export function useLoadingFeedback(key: string, loading: boolean) {
  const { updateLoadingKey } = useContext(FeedbackContext);

  useEffect(() => {
    updateLoadingKey(key, loading);
    return () => {
      updateLoadingKey(key, false);
    };
  }, [key, loading, updateLoadingKey]);
}
