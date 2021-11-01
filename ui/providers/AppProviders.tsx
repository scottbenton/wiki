import React from "react";
import { AuthProvider } from "./AuthProvider";
import { FeedbackProvider } from "./FeedbackProvider";
import { WikiListProvider } from "./WikiListProvider";

export const AppProviders: React.FC = (props) => {
  const { children } = props;

  return (
    <FeedbackProvider>
      <AuthProvider>
        <WikiListProvider>{children}</WikiListProvider>
      </AuthProvider>
    </FeedbackProvider>
  );
};
