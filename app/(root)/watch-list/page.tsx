import WatchListButtons from "@/components/shared/WatchListButtons";
import { getWatchlistMovies } from "@/lib/actions/movie.actions";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  const { userId: clerkId } = auth();

  const movies = await getWatchlistMovies({ clerkId });

  return (
    <section>
      <div className="relative h-[75vh] w-full">
        <div className="bg-gradient-to-b h-[160px] from-black opacity-[0.90067] z-[49] to-transparent absolute top-0 left-0 right-0" />
        <Image
          src={"/images/watchlist.png"}
          alt="watchlist"
          fill
          className="h-[75vh] w-full object-cover object-right sm:object-center z-40"
        />

        <div className="bg-gradient-to-t h-[175px] from-black opacity-[1] z-[49] to-transparent absolute bottom-0 left-0 right-0" />
        <div className="absolute bottom-10 left-5 sm:left-10 flex flex-col gap-4 items-start z-50 text-shadow">
          <h3 className="text-slate-200 text-3xl md:text-5xl font-bold capitalize">
            your watchlist
          </h3>
        </div>
      </div>
      <div className="space-y-9 mt-16 pb-8">
        {movies?.length === 0 && (
          <div className="flex flex-col gap-2.5 w-full items-center justify-center pt-5 pb-12">
            <p className="text-gray-100 text-3xl font-semibold">
              Your Watchlist is Empty,
            </p>
            <Link
              href="/discover"
              className="text-primary text-3xl font-bold hover:text-primary/80 transition-all underline">
              Add Movies.
            </Link>
          </div>
        )}

        {movies?.map((movie) => (
          <>
            <div
              key={movie.id}
              className="w-full flex-col md:flex-row px-8 md:px-12 flex items-center justify-between">
              <div className="flex items-start gap-2 sm:gap-4 md:gap-8">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt="movie"
                  width={900}
                  height={950}
                  className="w-32 h-52 sm:w-40 sm:h-60 object-cover object-center rounded-md border-2 border-primary/50"
                />
                <div className="flex flex-col items-start justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 h-60 max-w-sm">
                  <h3 className="text-2xl font-bold text-gray-100">
                    {movie.title}
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-6">
                    {movie.overview}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-4">
                <WatchListButtons id={movie.id} />
              </div>
            </div>
            {movies.length - 1 !== movies.indexOf(movie) && (
              <div className="h-px w-[80%] bg-gray-500 bg-opacity-20 mx-auto" />
            )}
          </>
        ))}
      </div>
    </section>
  );
};

export default Page;
