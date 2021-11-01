import clsx from "clsx";
import React from "react";

export interface FullPageMessageProps {
  title: React.ReactNode;
  message?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  messageClassName?: string;
  actions?: React.ReactNode;
}

export const FullPageMessage: React.FC<FullPageMessageProps> = (props) => {
  const {
    title,
    message,
    className,
    titleClassName,
    messageClassName,
    actions,
  } = props;

  return (
    <section className={clsx(className, "flex flex-col items-center")}>
      <h2
        className={clsx(
          titleClassName,
          "text-gray-900 text-4xl font-semibold tracking-wide"
        )}
      >
        {title}
      </h2>
      {message && (
        <p className={clsx(messageClassName, "mt-4 text-gray-600")}>
          {message}
        </p>
      )}
      {actions && <div className={"mt-6 space-x-2 flex"}>{actions}</div>}
    </section>
  );
};
