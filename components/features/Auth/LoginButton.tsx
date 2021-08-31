import clsx from "clsx";
import { Button, ButtonProps } from "components/shared/Button";
import { useAuth } from "providers/AuthProvider";
import React from "react";

interface LoginButtonProps extends Partial<ButtonProps> {
  large?: boolean;
}

export const LoginButton: React.FC<LoginButtonProps> = (props) => {
  const { large, ...buttonProps } = props;
  const { user, signInWithGoogle, loading } = useAuth();
  return (
    <Button
      variant={"contained"}
      color={"primary"}
      className={clsx("inline-flex", large ? "text-lg" : "")}
      id={"cta"}
      href={user ? "/wikis" : undefined}
      onClick={user ? undefined : () => signInWithGoogle()}
      loading={loading}
      {...buttonProps}
    >
      {user ? "Go to your Wikis" : "Login / Create Account"}
    </Button>
  );
};
