import React from "react";
import { InputBase } from "./InputBase";

export interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  helperText?: string;
  label: string;
  id: string;
  error?: boolean;
  className?: string;
}

export const TextArea: React.FC<TextAreaProps> = (props) => {
  const {
    helperText,
    label,
    id,
    error,
    className,
    required,
    onFocus,
    onBlur,
    ...inputProps
  } = props;

  const descriptiveID = id + "-input";

  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const handleFocus = (evt: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus && onFocus(evt);
  };

  const handleBlur = (evt: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur && onBlur(evt);
  };

  return (
    <InputBase
      id={descriptiveID}
      helperText={helperText}
      className={className}
      label={label}
      error={error}
      focused={isFocused}
      required={required}
    >
      <textarea
        className={"input"}
        id={descriptiveID}
        data-testid={descriptiveID}
        autoComplete={"no"}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...inputProps}
      />
    </InputBase>
  );
};
