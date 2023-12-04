import UserCard from "@/components/UserCard";
import { getAllUsers, getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

const Page = async () => {
  const { userId: clerkId } = auth();

  const userInfo = await getUserById({
    clerkId,
  });

  const users = await getAllUsers();

  return (
    <section>
      <div className="relative h-[70vh] w-full">
        <div className="bg-gradient-to-b h-[160px] from-black opacity-[0.90067] z-[49] to-transparent absolute top-0 left-0 right-0" />
        <Image
          src={"/images/community.png"}
          alt="movie"
          fill
          className="h-[75vh] w-full object-cover object-center z-40"
        />

        <div className="bg-gradient-to-t h-[235px] from-black opacity-[0.89] z-[49] to-transparent absolute bottom-0 left-0 right-0" />
      </div>
      <div className="w-full flex flex-col items-start justify-center gap-4 px-8 md:px-16 py-10">
        <h1 className="text-xl md:text-3xl font-semibold text-gray-100">
          Discover Our Community
        </h1>
        <div className="h-px w-[40%] md:w-[20%] bg-gray-500/30" />
      </div>
      <div className="w-full flex flex-wrap items-center justify-center gap-8 px-8 md:px-16 pt-10 pb-20">
        {users?.map((user) => {
          let isFollowed = userInfo?.user.following.includes(user._id);
          let currentUser = user.clerkId === clerkId;

          return (
            <UserCard
              key={user._id}
              user={user}
              isFollowed={isFollowed}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Page;
