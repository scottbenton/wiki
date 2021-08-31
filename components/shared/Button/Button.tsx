import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { Spinner } from "../Spinner";

export type ButtonColors = "inherit" | "primary" | "error" | "default";
export type ButtonVariants = "contained" | "outlined" | "text";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  id: string;
  variant?: ButtonVariants;
  color?: ButtonColors;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  href?: string;
}

const classMap: {
  [color in ButtonColors]: { [variant in ButtonVariants]: string };
} = {
  inherit: {
    contained: "btn-inherit-contained",
    outlined: "btn-inherit-outlined",
    text: "btn-inherit-text",
  },
  default: {
    contained: "btn-default-contained",
    outlined: "btn-default-outlined",
    text: "btn-default-text",
  },
  primary: {
    contained: "btn-primary-contained",
    outlined: "btn-primary-outlined",
    text: "btn-primary-text",
  },
  error: {
    contained: "btn-error-contained",
    outlined: "btn-error-outlined",
    text: "btn-error-text",
  },
};

const variantMap: { [variant in ButtonVariants]: string } = {
  contained: "btn-contained",
  outlined: "btn-outlined",
  text: "btn-text",
};

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    variant = "text",
    color = "inherit",
    disabled,
    loading,
    className,
    id,
    onClick,
    href,
    ...buttonProps
  } = props;

  const descriptiveId = id + "-button";

  const Element = href ? "span" : "button";

  const combinedProps = {
    className: clsx(
      "btn",
      variantMap[variant],
      classMap[color][variant],
      className
    ),
    onClick: (evt: React.MouseEvent<HTMLElement>) => {
      evt.currentTarget.blur();
      onClick && onClick(evt);
    },
    disabled: disabled || loading,
    id: descriptiveId,
    "data-testid": descriptiveId,
    ...buttonProps,
  };

  const MyButton = () => (
    <Element
      className={clsx(
        "btn",
        variantMap[variant],
        classMap[color][variant],
        className
      )}
      onClick={(evt) => {
        evt.currentTarget.blur();
        onClick && onClick(evt);
      }}
      disabled={disabled || loading}
      id={descriptiveId}
      data-testid={descriptiveId}
      {...buttonProps}
    ></Element>
  );

  if (href) {
    return (
      <Link href={href}>
        <a {...combinedProps}>
          {loading && <Spinner className={"mr-2"} diameter={16} />}
          {children}
        </a>
      </Link>
    );
  } else {
    return (
      <button {...combinedProps}>
        {loading && <Spinner className={"mr-2"} diameter={16} />}
        {children}
      </button>
    );
  }
};
