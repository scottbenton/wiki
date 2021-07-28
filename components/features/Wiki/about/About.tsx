import React from "react";
import { useBaseWikiInfo } from "../BaseWikiProvider";

export const About: React.FC = () => {
  const { info } = useBaseWikiInfo();

  if (!info.data) return null;

  return (
    <>
      <h1>{info.data.name}</h1>
      <p>{info.data.description}</p>
    </>
  );
};
