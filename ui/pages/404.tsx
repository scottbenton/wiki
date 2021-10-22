import React from "react";
import { PageLayout } from "components/layout/PageLayout";
import { Button } from "components/shared/Button";
import { useAuth } from "providers/AuthProvider";

const Custom404: React.FC = (props) => {
  const { user } = useAuth();
  return (
    <PageLayout
      pageType={"centered"}
      errorMessage={"Page Not Found"}
      errorMessageProps={{
        message: "Please follow one of the following links.",
        actions: (
          <>
            <Button
              id={"navigate-home"}
              href={"/"}
              variant={"outlined"}
              color="primary"
            >
              Home
            </Button>
            {user && (
              <Button
                id={"navigate-wikis"}
                href={"/wikis"}
                variant={"contained"}
                color={"primary"}
              >
                Your Wikis
              </Button>
            )}
          </>
        ),
      }}
    />
  );
};

export default Custom404;
