"use client";

import { navLinks } from "@/constants";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="w-full bg-black">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between px-5 gap-24 lg:gap-0 md:px-8 lg:px-12 py-12 border-t border-gray-700/50">
        <div className="w-full lg:w-auto flex flex-col items-center sm:items-start justify-center gap-16">
          <h2 className="max-w-md text-center sm:text-start text-2xl sm:text-3xl font-semibold text-gray-100">
            Our platform is trusted by millions & features best updated movies
            all arouned the world
          </h2>
          <span className="flex items-center justify-center gap-3 sm:gap-4 text-gray-300">
            <p className="text-[12px] sm:text-sm font-medium cursor-pointer">
              Privacy Policy
            </p>
            <div className="h-4 w-px bg-gray-600" />
            <p className="text-[12px] sm:text-sm font-medium cursor-pointer">
              Terms of Service
            </p>
            <div className="h-4 w-px bg-gray-600" />
            <p className="text-[12px] sm:text-sm font-medium cursor-pointer">
              Language
            </p>
          </span>
        </div>
        <div className="w-full lg:w-auto flex flex-col justify-center items-center sm:items-end gap-20">
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            {navLinks.map((link, index) => (
              <>
                <Link
                  key={index}
                  href={link.href}
                  className={`${
                    link.href === pathname
                      ? "text-primary font-semibold"
                      : "text-gray-300"
                  } font-medium text-base sm:text-lg capitalize`}>
                  {link.title === "movie release" ? "release" : link.title}
                </Link>
                {navLinks.length - 1 !== index && (
                  <p className="text-gray-300 font-medium">/</p>
                )}
              </>
            ))}
          </div>
          <div className="flex flex-col items-center justify-end gap-3">
            <div className="flex items-center gap-3">
              <Instagram className="cursor-pointer text-white w-7 h-7" />
              <Facebook className="cursor-pointer text-white w-7 h-7" />
              <Twitter className=" cursor-pointer text-white w-7 h-7" />
              <Linkedin className=" cursor-pointer text-white w-7 h-7" />
            </div>
            <p className="text-gray-400 text-sm font-normal mt-12">
              © 2023. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
