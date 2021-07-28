import React, { useCallback, useState } from "react";
import { FeedbackContext } from "./FeedbackContext";
export const FeedbackProvider: React.FC = (props) => {
  const { children } = props;

  const [loadingKeys, setLoadingKeys] = useState<{ [key: string]: boolean }>(
    {}
  );
  const isLoading = Object.values(loadingKeys).reduce(
    (acc, curr) => acc || curr,
    false
  );

  const updateLoadingKey = useCallback((key: string, value: boolean) => {
    setLoadingKeys((oldKeys) => {
      let newKeys = { ...oldKeys };

      if (value) {
        newKeys[key] = true;
      } else {
        delete newKeys[key];
      }

      return newKeys;
    });
  }, []);

  return (
    <FeedbackContext.Provider value={{ loading: isLoading, updateLoadingKey }}>
      {children}
    </FeedbackContext.Provider>
  );
};
