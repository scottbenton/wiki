import React, { ChangeEvent } from "react";
import { InputBase } from "./InputBase";

export interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
  helperText?: string;
  label: string;
  id: string;
  error?: boolean;
  className?: string;
  startAdornment?: React.ReactElement;
  endAdornment?: React.ReactElement;
}

export const TextInput: React.FC<TextInputProps> = (props) => {
  const {
    onChange,
    helperText,
    label,
    id,
    required,
    error,
    className,
    onFocus,
    onBlur,
    startAdornment,
    endAdornment,
    ...otherProps
  } = props;
  const { maxLength } = props;

  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [inputLength, setInputLength] = React.useState<number>(0);

  let helpers = helperText;
  if (maxLength) {
    helpers = inputLength + "/" + maxLength;
  }

  let descriptiveID = id + "-input";

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputLength(evt.target.value.length);
    onChange && onChange(evt);
  };

  const handleFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus && onFocus(evt);
  };

  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur && onBlur(evt);
  };

  return (
    <InputBase
      id={descriptiveID}
      helperText={helpers}
      className={className}
      label={label}
      error={error}
      focused={isFocused}
      required={required}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
    >
      <input
        className={"input"}
        data-testid={descriptiveID}
        id={descriptiveID}
        onChange={handleChange}
        autoComplete={"no"}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...otherProps}
      />
    </InputBase>
  );
};
