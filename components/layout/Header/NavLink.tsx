import React from "react";
import Link from "next/link";

export interface NavLinkProps {
  href: string;
}

export const NavLink: React.FC<NavLinkProps> = (props) => {
  const { href, children } = props;
  return (
    <Link href={href}>
      <span
        className={
          "transition-opacity duration-300 ease-in-out cursor-pointer h-full py-4 px-2 font-semibold tracking-wide text-primary-700 uppercase bg-opacity-0 bg-primary-100 hover:bg-opacity-100 focus:ring-white focus:ring-opacity-50 focus:ring-2"
        }
      >
        {children}
      </span>
    </Link>
  );
};
