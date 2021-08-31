import React from "react";
import {
  DocumentTextIcon,
  FolderOpenIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { Feature } from "./Feature";

export const FeatureSection: React.FC = (props) => {
  return (
    <section
      className={
        "rounded-xl border-2 max-w-screen-xl mx-auto w-full mt-12 sm:mt-32 p-4"
      }
    >
      <h3
        className={
          "text-3xl sm:text-4xl text-primary-600 font-black lowercase font-branding"
        }
      >
        Features
      </h3>
      <Feature
        title={"Categorize your Notes"}
        description={
          "Stay focused by categorizing your notes, ideas, and projects into different wikis"
        }
        imageSrc={"/images/WikiListScreenshot.png"}
        Icon={FolderOpenIcon}
      />
      <Feature
        title={"Infinite Pages"}
        description={
          "Create any number of pages or subpages to follow up on your ideas, or group them together"
        }
        imageSrc={"/images/WikiSidebarScreenshot.png"}
        Icon={DocumentTextIcon}
        flipSide
      />
      <Feature
        title={"Format your Content"}
        description={
          "Keep your notes looking good with extensive formatting options"
        }
        imageSrc={"/images/WikiPageScreenshot.png"}
        Icon={PencilIcon}
      />
    </section>
  );
};
