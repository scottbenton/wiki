import React from "react";
import {
  DocumentTextIcon,
  DocumentDuplicateIcon,
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
        title={"Stay Organized with Wikis"}
        description={
          "Each wiki is like a folder for your ideas. Group your pages of notes into separate wikis, keeping you focused on the task at hand."
        }
        imageSrc={"/images/WikiListScreenshot.png"}
        Icon={FolderOpenIcon}
      />
      <Feature
        title={"Put your Thoughts on Pages"}
        description={
          "Type out your ideas, and then come back and view, edit, or delete them whenever you like, on whatever device you like. All of your notes are securely stored in the cloud."
        }
        imageSrc={"/images/WikiPageScreenshot.png"}
        Icon={DocumentTextIcon}
        flipSide
      />
      <Feature
        title={"Page Hierarchy"}
        description={
          "Any page in your wiki can have any number of pages organized under them. Follow up on a thought or idea, or organize your notes further."
        }
        imageSrc={"/images/WikiSidebarScreenshot.png"}
        Icon={DocumentDuplicateIcon}
      />
      <Feature
        title={"Format your Content"}
        description={
          "Keep your notes consistent and easy on the eyes with our formatting options."
        }
        imageSrc={"/images/WikiEditScreenshot.png"}
        Icon={PencilIcon}
        flipSide
      />
    </section>
  );
};
