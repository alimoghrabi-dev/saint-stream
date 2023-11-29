"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { removeMovieFromList } from "@/lib/actions/movie.actions";
import { usePathname } from "next/navigation";
import { Trash2Icon } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

interface buttonProps {
  id: number;
}

const WatchListButtons = ({ id }: buttonProps) => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const handleRemoveFromList = async () => {
    try {
      await removeMovieFromList({
        userId,
        movieId: id,
        path: pathname,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={handleRemoveFromList} className="w-full md:w-[200px]">
        <Trash2Icon className="w-4 h-4 mr-2" />
        Remove from List
      </Button>
      <Link href={`/movie/${id}`} className="w-full md:w-[200px]">
        <Button
          variant={"ghost"}
          className="w-full text-white border border-white">
          Go to Movie Page
        </Button>
      </Link>
    </>
  );
};

export default WatchListButtons;
