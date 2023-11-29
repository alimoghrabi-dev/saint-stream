"use client";

import { ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { useState } from "react";

interface Props {
  userInfo: any;
  watchListLength: number;
}

const UserComponent = ({ watchListLength, userInfo }: Props) => {
  const { signOut } = useClerk();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut(() => router.push("/"));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-0.5 cursor-pointer rounded-2xl outline-none ring-0 border-none">
        <Image
          src={userInfo?.user.picture}
          width={33}
          height={33}
          alt="Profile"
          className="rounded-full"
        />
        <ChevronDown className="text-gray-200" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-6 ml-2 rounded-md mt-1.5 bg-[#1a1a1a] border-none shadow-xl text-gray-200 px-3 pb-3 pt-1.5">
        <DropdownMenuLabel className="text-gray-100 font-medium text-base text-center capitalize">
          {userInfo?.user.username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/20 w-full mx-auto" />
        <Link href={`/profile/${userInfo?.user.clerkId}`}>
          <DropdownMenuItem className="cursor-pointer text-gray-300 font-medium text-sm mb-1 transition-all mt-2.5 hover:bg-black/30 rounded-md ">
            Profile
          </DropdownMenuItem>
        </Link>
        <Link href={"/watch-list"}>
          <DropdownMenuItem className="cursor-pointer text-gray-300 font-medium transition-all hover:bg-black/30 mb-1 rounded-md ">
            WatchList
            {watchListLength > 0 && (
              <span className="text-white text-[10px] font-bold bg-primary rounded-full px-[7px] ml-4">
                {watchListLength}
              </span>
            )}
          </DropdownMenuItem>
        </Link>
        <Link href={"/profile/edit"}>
          <DropdownMenuItem className="cursor-pointer text-gray-300 font-medium transition-all hover:bg-black/30 rounded-md mb-2.5">
            Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="bg-white/20 w-full mx-auto" />
        <DropdownMenuLabel
          onClick={handleSignOut}
          className={`text-gray-100 py-2 font-medium text-[16px] text-center flex gap-1 ${
            !isLoading && "hover:hover:bg-black/30 cursor-pointer"
          } rounded-md transition-all mt-2 items-center justify-center`}>
          {isLoading ? (
            <div className="loading-spinner" />
          ) : (
            <>
              <LogOut className="w-5 h-5 mt-0.5" />
              Logout
            </>
          )}
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserComponent;
