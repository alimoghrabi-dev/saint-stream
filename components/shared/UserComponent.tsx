import { ChevronDown } from "lucide-react";
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

interface Props {
  userInfo: any;
}

const UserComponent = ({ userInfo }: Props) => {
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
        <DropdownMenuLabel className="text-gray-100 font-medium text-base text-center">
          {userInfo?.user.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/20 w-full mx-auto" />
        <DropdownMenuItem className="cursor-pointer text-gray-300 font-medium text-sm mb-1.5 mt-2.5 hover:bg-black/30">
          <Link href={`/profile/${userInfo?.user.clerkId}`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-gray-300 font-medium hover:bg-black/30 mb-1.5">
          <Link href={"/watch-list"}>WatchList</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-gray-300 font-medium hover:bg-black/30">
          <Link href={"/settings"}>Settings</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserComponent;
