import { navLinks } from "@/constants";
import Image from "next/image";
import LinksComponents from "./LinksComponents";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, auth } from "@clerk/nextjs";
import ListRender from "../ListRender";
import { getUserById, getWatchlistLength } from "@/lib/actions/user.actions";
import UserComponent from "./UserComponent";

const Navbar = async () => {
  const { userId: clerkId } = auth();

  const userInfo = await getUserById({
    clerkId,
  });

  const watchListLength = await getWatchlistLength(clerkId);

  return (
    <header className="absolute top-0 w-full bg-transparent h-[80px] z-50">
      <nav className="w-full flex items-center h-full">
        <div className="w-full h-full flex items-center justify-between px-3 sm:px-8">
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
          <div className="hidden lg:flex items-center justify-center gap-8 h-full">
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
              <UserComponent
                watchListLength={watchListLength}
                userInfo={userInfo}
              />
            </SignedIn>
            <SignedOut>
              <Link href={"/sign-up"}>
                <Button
                  variant="ghost"
                  className="text-gray-100 border border-gray-100 transition duration-150">
                  Sign Up
                </Button>
              </Link>
              <Link href={"/sign-in"}>
                <Button className="border-primary border transition duration-150 hover:bg-primary/80 hover:border-primary/80">
                  Login
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
