import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

const MovieContainerOfTheWeek = ({ movie, index }: any) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="text-gray-100 text-4xl font-semibold">{index + 1}</div>
      <Link
        href={`/movie/${movie.id}`}
        className="relative min-h-[180px] min-w-[120px] cursor-pointer rounded-lg">
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={movie.title}
          fill
          className="w-full h-full rounded-lg object-cover hover:opacity-75 transition ease-in-out border border-primary/[0.15] shadow-md shadow-primary/20"
        />
      </Link>
      <div className="flex flex-col justify-between gap-6">
        <Link
          href={`/movie/${movie.id}`}
          className="text-lg font-semibold text-gray-100 line-clamp-2">
          {movie.title}
        </Link>
        <span className="flex items-center gap-2">
          <p className="text-white font-semibold text-sm flex gap-1 items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </p>
          <div className="h-5 w-px bg-gray-500/50" />
          <p className="text-gray-600 text-sm font-semibold">Movie</p>
        </span>
      </div>
    </div>
  );
};

export default MovieContainerOfTheWeek;
