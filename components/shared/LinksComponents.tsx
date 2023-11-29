"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  navLinks: {
    id: string;
    title: string;
    href: string;
  }[];
  className: string;
  NavLink?: boolean;
}

const LinksComponents = ({ navLinks, className, NavLink }: Props) => {
  const pathName = usePathname();

  return (
    <>
      {navLinks.map((link, index) => (
        <Link
          key={link.id}
          href={link.href}
          className={`${className} ${
            pathName === link.href
              ? `${
                  NavLink
                    ? "text-white font-semibold border-t-2 border-primary h-[98%] flex items-center mb-0.5"
                    : "text-white font-semibold"
                }`
              : `${
                  NavLink
                    ? "text-gray-300 hover:text-gray-200 transition-colors font-normal"
                    : "text-gray-300 hover:text-gray-200 transition-colors font-normal"
                }`
          } ${
            !NavLink &&
            navLinks.length - 1 !== index &&
            "border-r border-gray-400 pr-2"
          }`}>
          {link.title}
        </Link>
      ))}
    </>
  );
};

export default LinksComponents;
