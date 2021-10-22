import { createContext } from "react";

interface IFeedbackContext {
  loading: boolean;
  updateLoadingKey: (key: string, isLoading: boolean) => void;
}

export const FeedbackContext = createContext<IFeedbackContext>({
  loading: false,
  updateLoadingKey: () => {},
});
