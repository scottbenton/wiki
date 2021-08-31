import React from "react";
import { LoginButton } from "../Auth/LoginButton";

export const GetStartedSection: React.FC = (props) => {
  return (
    <section
      className={
        "flex justify-between flex-wrap items-center mt-8 sm:mt-16 bg-primary-700 text-white p-4 rounded-xl"
      }
    >
      <p className={"text-2xl font-semibold"}>Interested? Get started!</p>
      <LoginButton large color={"default"} />
    </section>
  );
};
