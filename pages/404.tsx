import React from "react";
import { useAuth } from "providers/AuthProvider";
import { PageLayout } from "components/layout/PageLayout";
import { FullPageMessage } from "components/shared/FullPageMessage";
import { Card } from "components/shared/Card";
import { Button } from "components/shared/Button";

const Custom404: React.FC = (props) => {
  const { user } = useAuth();
  return (
    <PageLayout pageType={"centered"}>
      <Card className={"p-8"}>
        <FullPageMessage
          title={"Page not found"}
          message={"Please follow one of the following links"}
          actions={
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
          }
        />
      </Card>
    </PageLayout>
  );
};

export default Custom404;
