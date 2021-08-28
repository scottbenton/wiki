import React from "react";
import {
  RichTextInput,
  RichTextInputProps,
} from "components/shared/RichTextInput";
import { useWikiLinkExtensionScratch } from "./WikiLinkExtension";

export interface WikiRichTextInputProps extends RichTextInputProps {}

export const WikiRichTextInput: React.FC<WikiRichTextInputProps> = (props) => {
  const { extensions = [], ...rteProps } = props;
  const wikiMentionExtension = useWikiLinkExtensionScratch();

  return (
    <RichTextInput
      {...rteProps}
      extensions={[...extensions, wikiMentionExtension]}
    />
  );
};
