import React, { useCallback, useEffect, useState } from "react";
import { FeedbackContext } from "./FeedbackContext";
import router from "next/router";

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

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      updateLoadingKey("changePage", true);
    });
    router.events.on("routeChangeComplete", () => {
      updateLoadingKey("changePage", false);
    });
  }, [updateLoadingKey]);

  return (
    <FeedbackContext.Provider value={{ loading: isLoading, updateLoadingKey }}>
      {children}
    </FeedbackContext.Provider>
  );
};
