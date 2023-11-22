import { navLinks } from "@/constants";
import Image from "next/image";
import LinksComponents from "./LinksComponents";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import ListRender from "../ListRender";

const Navbar = () => {
  return (
    <header className="absolute top-0 w-full bg-transparent z-50">
      <nav className="w-full flex items-center py-6">
        <div className="w-full flex items-center justify-between px-3 sm:px-8">
          <div className="flex items-center justify-center">
            <Link href={"/"} className="flex gap-1">
              <Image
                src={"/icons/Logo.svg"}
                width={30}
                height={30}
                alt="Logo"
              />
              <Image
                src={"/icons/SaintStream.svg"}
                width={100}
                height={30}
                alt="LogoText"
              />
            </Link>
          </div>
          <div className="hidden lg:flex items-center justify-center gap-8">
            <LinksComponents
              navLinks={navLinks}
              className={"capitalize text-[16px]"}
              NavLink
            />
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <Search className="text-gray-100 w-6 h-6 mr-2 cursor-pointer hidden sm:block" />
            <SignedIn>
              <ListRender />
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link href={"/sign-up"}>
                <Button
                  variant="ghost"
                  className="text-gray-100 border border-gray-100">
                  Sign Up
                </Button>
              </Link>
              <Link href={"/sign-in"}>
                <Button className="border-primary border">Login</Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
