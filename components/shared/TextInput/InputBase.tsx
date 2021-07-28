import clsx from "clsx";
import React from "react";
import { HelperText } from "./HelperText";
import { InputBox } from "./InputBox";
import { InputLabel } from "./InputLabel";

export interface InputBaseProps {
  className?: string;
  label?: string;
  error?: boolean;
  focused?: boolean;
  id: string;
  required?: boolean;
  startAdornment?: React.ReactElement;
  endAdornment?: React.ReactElement;
  helperText?: string;
}

export const InputBase: React.FC<InputBaseProps> = (props) => {
  const {
    children,
    className,
    label,
    error,
    focused,
    id,
    required,
    startAdornment,
    endAdornment,
    helperText,
  } = props;

  return (
    <div className={clsx("input-container", className)}>
      {label && (
        <InputLabel error={error} htmlFor={id}>
          {label + (required ? "*" : "")}
        </InputLabel>
      )}
      <InputBox focused={focused} error={error}>
        {startAdornment}
        {children}
        {endAdornment}
      </InputBox>
      <HelperText error={error}>{helperText}</HelperText>
    </div>
  );
};
