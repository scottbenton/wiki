import React from "react";
import { Avatar } from "components/shared/Avatar";
import { getHSLFromString } from "utils/hueHelpers";

export interface WikiAvatarProps {
  wikiName: string;
  wikiId: string;
  className?: string;
}

export const WikiAvatar: React.FC<WikiAvatarProps> = (props) => {
  const { wikiId, wikiName, className } = props;

  return (
    <Avatar
      backgroundColor={getHSLFromString(wikiId, 80, 70)}
      textColor={getHSLFromString(wikiId, 80, 10)}
      className={className}
    >
      {wikiName.trimStart()[0]}
    </Avatar>
  );
};
