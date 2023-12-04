"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { UnFollowUser, followUser } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";

interface Props {
  paramsId: string;
  userId: string | null;
  isUserAlreadyFollowed: boolean;
}

const FollowUnfollow = ({ paramsId, userId, isUserAlreadyFollowed }: Props) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const handleFollow = async () => {
    setLoading(true);
    try {
      await followUser({
        clerkId: paramsId,
        userId,
        path: pathname,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnFollow = async () => {
    setLoading(true);
    try {
      await UnFollowUser({
        clerkId: paramsId,
        userId,
        path: pathname,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={isUserAlreadyFollowed ? handleUnFollow : handleFollow}
      disabled={loading}
      variant={"outline"}
      className="bg-transparent text-white px-4 md:px-5 rounded-full">
      {isUserAlreadyFollowed ? (
        loading ? (
          <div className="loading-spinner" />
        ) : (
          "Unfollow"
        )
      ) : loading ? (
        <div className="loading-spinner" />
      ) : (
        "Follow"
      )}
    </Button>
  );
};

export default FollowUnfollow;
