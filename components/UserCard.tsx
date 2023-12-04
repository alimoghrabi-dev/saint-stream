import { UserCheck, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const UserCard = ({ user, isFollowed, currentUser }: any) => {
  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="w-[250px] h-[250px] cursor-pointer rounded-lg hover:bg-black/70 transition-all ring-1 ring-primary/10 hover:ring-offset-primary/40 hover:ring-offset-[3px] shadow-lg shadow-primary/20 hover:shadow-primary/25">
      <div className="relative w-full h-full">
        <Image
          src={"/images/user-bg.jpg"}
          alt={"background"}
          fill
          className="w-full h-full object-cover object-center rounded-lg opacity-30 blur-[1px]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-start py-10 rounded-lg">
          <Image
            src={user?.picture}
            alt={user?.name}
            width={62}
            height={62}
            className="rounded-full border border-primary/30"
          />
          <h3 className="capitalize text-white text-shadow font-semibold text-xl mt-1">
            {user?.username}
          </h3>
          <p className="text-primary/70 text-sm font-medium text-shadow">
            {user?.email}
          </p>
          <span className="text-gray-100 font-medium text-shadow text-base flex gap-1.5 mt-5">
            Followers :
            <p className="text-primary text-[17px] font-semibold">
              {user?.followers?.length}
            </p>
          </span>
          <div className="bg-primary/50 w-5 h-px" />
          <span className="text-gray-100 font-medium text-shadow text-base flex gap-1.5 mt-2.5">
            Movies in list :
            <p className="text-primary text-[17px] font-semibold">
              {user?.watchList?.length}
            </p>
          </span>
        </div>
        {!currentUser && isFollowed ? (
          <UserCheck className="absolute top-2 cursor-default right-2 text-gray-100 z-50 bg-primary/70 transition-all p-1 rounded-full w-8 h-8" />
        ) : !currentUser && !isFollowed ? (
          <UserPlus className="absolute top-2 right-2 text-gray-100 z-50 hover:bg-primary/70 transition-all p-1 rounded-full w-8 h-8" />
        ) : null}
      </div>
    </Link>
  );
};

export default UserCard;
