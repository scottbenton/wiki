import React from "react";
import { useWikiPage } from "../WikiPageProvider";

export const About: React.FC = () => {
  const { info } = useWikiPage();

  if (!info.data) return null;

  return (
    <>
      <h1>{info.data.name}</h1>
      <p>{info.data.description}</p>
    </>
  );
};
