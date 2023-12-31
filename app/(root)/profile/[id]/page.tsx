import FollowUnfollow from "@/components/FollowUnfollow";
import FetchMovieListProfile from "@/components/shared/FetchMovieListProfile";
import Followers from "@/components/shared/Followers";
import Following from "@/components/shared/Following";
import { getWatchlistMovies } from "@/lib/actions/movie.actions";
import {
  getFollowersUsers,
  getFollowingUsers,
  getUserById,
} from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params }: any) => {
  const { userId } = auth();

  const userInfo = await getUserById({
    clerkId: params.id,
  });

  const visitorInfo = await getUserById({
    clerkId: userId,
  });

  const watchlistMovies = await getWatchlistMovies({
    clerkId: params.id,
  });

  let isUserAlreadyFollowed = visitorInfo?.user.following.includes(
    userInfo?.user._id
  );

  const getFollowingUsersVar = await getFollowingUsers({
    userId: params.id,
  });

  const getFollowersUsersVar = await getFollowersUsers({
    userId: params.id,
  });

  return (
    <section>
      <div className="relative h-[75vh] w-full">
        <div className="bg-gradient-to-b h-[160px] from-black opacity-[0.90067] z-[49] to-transparent absolute top-0 left-0 right-0" />
        <Image
          src={"/images/background-profile.png"}
          alt="movie"
          fill
          className="h-[75vh] w-full object-cover object-right sm:object-center z-40"
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
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-0 pb-12 pt-8">
        <div className="text-gray-100 flex items-start flex-col gap-8 pl-12 pr-12 md:pr-4 w-full md:w-[50%] lg:w-[40%] xl:w-[35%]">
          <div className="w-full flex items-center justify-between">
            <span className="text-gray-200 font-semibold text-lg">Profile</span>
            {params.id === userId ? (
              <Link
                href={"/profile/edit"}
                className="text-primary text-lg font-semibold flex gap-1 items-center hover:text-primary/80 transition duration-150">
                <Pencil className="w-[18px] h-[18px]" />
                Edit
              </Link>
            ) : (
              <FollowUnfollow
                paramsId={params.id}
                userId={userId}
                isUserAlreadyFollowed={isUserAlreadyFollowed}
              />
            )}
          </div>

          <div className="w-full flex items-center justify-between">
            <Image
              src={userInfo?.user.picture}
              alt="user"
              width={90}
              height={90}
              className="rounded-full border-2 border-primary/30"
            />
            <span className="flex flex-col gap-5 items-center">
              <span className="text-2xl font-semibold text-gray-100">
                {userInfo?.user.followers.length}
              </span>
              <Followers followers={getFollowersUsersVar} />
            </span>
            <span className="flex flex-col gap-5 items-center">
              <span className="text-2xl font-semibold text-gray-100">
                {userInfo?.user.following.length}
              </span>
              <Following following={getFollowingUsersVar} />
            </span>
          </div>

          <div className="flex items-start flex-col gap-4">
            <h4 className="text-3xl font-semibold text-gray-100 capitalize">
              {userInfo?.user.username}
            </h4>
            <div className="w-[50%] h-px bg-gray-400 bg-opacity-25" />
            <p className="text-gray-300 font-medium text-base">
              {!userInfo?.user.bio ? "No Bio Yet." : userInfo?.user.bio}
            </p>
          </div>
        </div>
        <div className="w-full md:w-[50%] lg:w-[60%] xl:w-[65%]">
          {watchlistMovies?.length === 0 && (
            <span className="text-white text-base font-medium w-full flex flex-col items-center justify-center">
              Your WatchList Is Empty, <br />
              <Link
                href={"/discover"}
                className="text-primary text-lg font-semibold hover:text-primary/80 transition duration-150">
                Add Some Movies.
              </Link>
            </span>
          )}
          <div
            className={`grid grid-cols-1 ${
              watchlistMovies?.length === 0 ? "hidden" : "overflow-hidden"
            }`}>
            <FetchMovieListProfile watchlistMovies={watchlistMovies} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
