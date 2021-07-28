import React, { HTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";
import Link from "next/link";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  style?: React.CSSProperties;
  className?: string;
  tabIndex?: number;
  topBorder?: boolean;
  handleClick?: () => void;
  href?: string;
  "data-testid"?: string;
}

export const Card: React.FC<CardProps> = (props) => {
  const {
    className,
    children,
    tabIndex,
    handleClick,
    topBorder,
    style,
    href,
    "data-testid": testId,
    ...attributes
  } = props;

  const onClick = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
    evt.currentTarget.blur();
    typeof handleClick === "function" && handleClick();
  };

  let Element: "div" | "button" = "div";
  if (handleClick) {
    Element = "button";
  }

  const MyCard = () => (
    <Element
      className={clsx(
        "bg-white text-gray-900 shadow-md rounded-lg",
        topBorder && "border-t-4 border-primary-500",
        (handleClick || href) &&
          "text-left transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:ring-2 ring-offset-smoke-default",
        className
      )}
      tabIndex={tabIndex}
      onClick={onClick}
      data-testid={testId}
      style={style}
      {...attributes}
    >
      {children}
    </Element>
  );

  if (href) {
    return (
      <Link href={href}>
        <a>
          <MyCard />
        </a>
      </Link>
    );
  } else {
    return <MyCard />;
  }
};
