import React from "react";
import Link from "next/link";
import { useAuth } from "providers/AuthProvider";
import { Button } from "components/shared/Button";
import { AvatarMenu } from "./AvatarMenu";
import { NavLink } from "./NavLink";
import { useFeedback } from "providers/FeedbackProvider";
import clsx from "clsx";
import { Transition } from "@headlessui/react";

export const Header: React.FC = (props) => {
  const { children } = props;

  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const { loading: pageLoading } = useFeedback();

  return (
    <div className={"bg-white shadow-lg z-50"}>
      <nav className="flex items-center justify-between px-4 md:px-8">
        <div className="flex items-baseline">
          <Link href="/">
            <a className="text-2xl text-primary-700 font-branding font-black mr-8 underlined-link">
              willo
            </a>
          </Link>
          <NavLink href={"/wikis"}>Your Wikis</NavLink>
        </div>
        {user ? (
          <AvatarMenu />
        ) : (
          <Button
            id="sign-in"
            variant="contained"
            color="primary"
            onClick={() => signInWithGoogle()}
            loading={authLoading}
          >
            Sign In
          </Button>
        )}
      </nav>
      {children && (
        <>
          <hr className={"mx-4 md:mx-8"} />
          <div className={"px-4 md:px-8"}>{children}</div>
        </>
      )}
      <div className={"w-full h-1 overflow-hidden pr-1 -mt-1"}>
        <Transition
          className={"h-full"}
          show={pageLoading}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={clsx("h-full bg-primary-500 animate-slide")} />
        </Transition>
      </div>
    </div>
  );
};
