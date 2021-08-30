import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "providers/AuthProvider";
import { Button } from "components/shared/Button";
import { AvatarMenu } from "./AvatarMenu";
import { NavLink } from "./NavLink";
import { useFeedback } from "providers/FeedbackProvider";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useIsMobile } from "hooks/useIsMobile";

export const Header: React.FC = (props) => {
  const { children } = props;

  const isMobile = useIsMobile();

  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const { loading: pageLoading } = useFeedback();

  return (
    <div className={"bg-white shadow-lg z-50"}>
      <nav className="px-4 md:px-8 h-14 flex items-center">
        <div className="flex-grow h-full flex items-center">
          <Link href="/">
            <a
              className={
                "flex items-center mr-2 md:mr-10 focus:bg-primary-200 focus:outline-none hover:bg-primary-200 p-1 rounded-md"
              }
            >
              {isMobile ? (
                <Image
                  src={"/branding/logo/WilloLogo128.png"}
                  alt="willo"
                  width={33}
                  height={40}
                />
              ) : (
                <Image
                  src={"/branding/wordmark/WilloWordmark128.png"}
                  alt="willo"
                  width={78}
                  height={40}
                />
              )}
            </a>
          </Link>
          {user && <NavLink href={"/wikis"}>Your Wikis</NavLink>}
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
