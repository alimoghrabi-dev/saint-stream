import { getFollowingWatchlist } from "@/lib/actions/movie.actions";
import { auth } from "@clerk/nextjs";
import FetchMovieFollowing from "./shared/FetchMovieFollowing";

const FriendChoice = async () => {
  const { userId } = auth();

  const movies = await getFollowingWatchlist({ userId });

  return (
    <div className="space-y-1">
      <div className="w-full flex items-center justify-between px-10 pt-1 pb-2">
        <h3 className="text-white font-semibold text-2xl">
          {"Friend's Choice"}
        </h3>
      </div>
      <FetchMovieFollowing movies={movies} />
    </div>
  );
};

export default FriendChoice;
