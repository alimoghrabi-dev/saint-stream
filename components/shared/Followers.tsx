"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Followers = ({ followers }: any) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-gray-300 font-medium text-sm hover:text-primary/70 transition-all">
        Followers
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#141414] border-none shadow-custom-2">
        <AlertDialogHeader>
          <div className="w-full flex justify-between items-center pb-4">
            <AlertDialogTitle className="text-gray-100 font-semibold text-xl">
              Followers
            </AlertDialogTitle>
            <AlertDialogCancel className="p-0 bg-[#141414] border border-[#141414] hover:bg-[#141414]">
              <X className="w-5 h-5 text-gray-100 hover:text-gray-300 transition-all" />
            </AlertDialogCancel>
          </div>
          <div className="w-full h-px bg-gray-800/50 mx-auto" />
          <AlertDialogDescription className="w-full flex items-center justify-center flex-wrap gap-8">
            {followers.length === 0 ? (
              <p className="pt-3 text-base">No Followers Yet.</p>
            ) : (
              followers.map((follow: any) => (
                <Link
                  href={`/profile/${follow.clerkId}`}
                  key={follow._id}
                  className="flex flex-col bg-gray-900/40 justify-center items-center gap-1.5 p-2 sm:p-3 md:p-4 rounded-2xl cursor-pointer border border-primary/50 ring-primary/50 ring-1 hover:ring-offset-2 hover:ring-offset-[#141414] transition-all">
                  <Image
                    src={follow.picture}
                    alt="user"
                    width={40}
                    height={40}
                    className="border border-primary/20 rounded-full"
                  />
                  <p className="text-gray-500 text-[13px] sm:text-sm font-medium">
                    @{follow.username}
                  </p>
                </Link>
              ))
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Followers;
