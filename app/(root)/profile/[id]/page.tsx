import { getUserById } from "@/lib/actions/user.actions";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params }: any) => {
  const userInfo = await getUserById({
    clerkId: params.id,
  });

  return (
    <section>
      <div className="relative h-[75vh] w-full">
        <div className="bg-gradient-to-b h-[160px] from-black opacity-[0.90067] z-[49] to-transparent absolute top-0 left-0 right-0" />
        <Image
          src={"/images/background-profile.png"}
          alt="movie"
          fill
          className="h-[75vh] w-full object-cover object-center z-40"
        />

        <div className="bg-gradient-to-t h-[175px] from-black opacity-[1] z-[49] to-transparent absolute bottom-0 left-0 right-0" />
        <div className="absolute bottom-9 left-5 sm:left-12 flex flex-col gap-4 items-start z-50 text-shadow">
          <h3 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold capitalize">
            become a movie <br /> influencer
          </h3>
          <p className="text-gray-300 text-sm sm:text-base font-normal max-w-[250px] sm:max-w-lg">
            Share your tough about movie to people and become influencer.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-20 md:gap-5 pb-12 pt-8">
        <div className="text-gray-100 flex items-start flex-col gap-8 px-12">
          <div className="w-full flex items-center justify-between">
            <span className="text-gray-200 font-semibold text-lg">Profile</span>
            <Link
              href={"/profile/edit"}
              className="text-primary text-lg font-semibold flex gap-1 items-center hover:text-primary/80 transition duration-150">
              <Pencil className="w-[18px] h-[18px]" />
              Edit
            </Link>
          </div>
          <div className="flex items-center gap-12 sm:gap-20">
            <Image
              src={userInfo?.user.picture}
              alt="user"
              width={90}
              height={90}
              className="rounded-full border-2 border-primary/30"
            />
            <span className="flex flex-col gap-5 items-center">
              <span className="text-2xl font-semibold text-gray-100">0</span>
              <p className="text-gray-300 font-medium text-sm">Followers</p>
            </span>
            <span className="flex flex-col gap-5 items-center">
              <span className="text-2xl font-semibold text-gray-100">0</span>
              <p className="text-gray-300 font-medium text-sm">Following</p>
            </span>
          </div>
          <div className="flex items-start flex-col gap-4">
            <h4 className="text-3xl font-semibold text-gray-100">
              {userInfo?.user.name}
            </h4>
            <div className="w-[50%] h-px bg-gray-400 bg-opacity-25" />
            <p className="text-gray-300 font-medium text-base">
              {!userInfo?.user.bio ? "No Bio Yet." : userInfo?.user.bio}
            </p>
          </div>
        </div>
        <div className="flex-1 text-white text-base font-medium text-center">
          Your WatchList Is Empty, <br />
          <Link
            href={"/discover"}
            className="text-primary text-lg font-semibold hover:text-primary/80 transition duration-150">
            Add Some Movies.
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Page;
