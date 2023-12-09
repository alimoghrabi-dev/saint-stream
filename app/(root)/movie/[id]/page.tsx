import SingleMovie from "@/components/shared/singleMovie";
import { getComments } from "@/lib/actions/comment.actions";
import { checkExist, getMovieById } from "@/lib/actions/movie.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

const Page = async ({ params }: any) => {
  const { userId } = auth();

  const mongoUser = await getUserById({ clerkId: userId });

  const movieExists = await checkExist({
    id: params.id,
    userId: userId,
  });

  const movieFromDB = await getMovieById({
    movieId: params.id,
  });

  const movieComments = await getComments({
    movieId: params.id,
  });

  return (
    <div className="bg-black">
      <SingleMovie
        params={params}
        movieExists={movieExists}
        mongoUser={mongoUser?.user}
        movieFromDB={movieFromDB}
        movieComments={movieComments}
      />
    </div>
  );
};

export default Page;
