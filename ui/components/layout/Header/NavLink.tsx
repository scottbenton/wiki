import React from "react";
import Link from "next/link";

export interface NavLinkProps {
  href: string;
}

export const NavLink: React.FC<NavLinkProps> = (props) => {
  const { href, children } = props;
  return (
    <Link href={href}>
      <a
        className={
          "cursor-pointer h-full px-2 font-semibold tracking-wide text-primary-700 uppercase  focus:ring-white focus:ring-opacity-50 focus:ring-2 flex items-center justify-center border-collapse border-b-4 pt-2 hover:border-primary-500 border-transparent duration-150 transition-colors ease-in-out"
        }
      >
        {children}
      </a>
    </Link>
  );
};
