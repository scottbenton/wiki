import React from "react";
import Image from "next/image";
import { useAuth } from "providers/AuthProvider";
import { Button } from "components/shared/Button";

export const HeroSection: React.FC = () => {
  const { user, signInWithGoogle } = useAuth();
  return (
    <section className={"grid grid-cols-1 sm:grid-cols-2 mt-0 sm:mt-12"}>
      <div
        className={"flex flex-col items-center justify-center sm:items-start"}
      >
        <div className={"flex items-center mt-10"}>
          <Image
            src={"/branding/logo/WilloLogoBlank128.png"}
            alt={"willo leaf logo"}
            width={39}
            height={48}
          />
          <h1 className="font-branding font-black text-5xl md:text-6xl text-primary-600 ml-4">
            willo.wiki
          </h1>
        </div>
        <h2
          className={
            "text-2xl text-center sm:text-left font-semibold text-gray-500 mt-6"
          }
        >
          Organize your Thoughts, Ideas, and Notes
        </h2>
        <Button
          variant={"contained"}
          color={"primary"}
          className={"inline-flex mt-8 text-lg"}
          id={"cta"}
          href={user ? "/wikis" : undefined}
          onClick={user ? undefined : () => signInWithGoogle()}
        >
          {user ? "Go to your Wikis" : "Login / Create Account"}
        </Button>
      </div>
      <div className={"py-8 max-w-md mx-auto mt-8 sm:mt-0"}>
        <div
          className={
            "relative p-8 md:px-10 md:py-2 bg-primary-500 shadow-lg rounded-3xl transform -rotate-6"
          }
        >
          <img
            src={"/images/WikiPageMockup.png"}
            alt={"Wiki Page Example"}
            className={
              "transform rotate-6 border rounded-xl shadow-md border-gray-400 overflow-hidden"
            }
          />
        </div>
      </div>
    </section>
  );
};
