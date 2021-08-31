import { Button } from "components/shared/Button";
import { useAuth } from "providers/AuthProvider";
import React from "react";

export const GetStartedSection: React.FC = (props) => {
  const { user, signInWithGoogle } = useAuth();
  return (
    <section
      className={
        "flex justify-between flex-wrap items-center mt-8 sm:mt-16 bg-primary-700 text-white p-4 rounded-xl"
      }
    >
      <p className={"text-2xl font-semibold"}>Interested? Get started!</p>
      <Button
        id="cta"
        variant={"contained"}
        color={"default"}
        href={user ? "/wikis" : undefined}
        onClick={user ? undefined : () => signInWithGoogle()}
      >
        {user ? "Go to your Wikis" : "Login / Create Account"}
      </Button>
    </section>
  );
};
