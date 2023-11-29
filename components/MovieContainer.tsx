import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  movie: any;
  rate?: boolean;
}

const MovieContainer = ({ movie, rate }: Props) => {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="relative h-[240px] min-w-[160px] cursor-pointer rounded-lg">
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
        fill
        className="rounded-lg object-contain hover:opacity-75 transition ease-in-out border border-primary"
      />
      <div className="absolute bottom-2 left-1 flex flex-col justify-start gap-1 z-50">
        <h4
          className={`${
            rate ? "mb-0" : "mb-4"
          } text-base font-medium text-gray-100 text-shadow`}>
          {movie.title}
        </h4>
        {rate && (
          <p className="text-white text-sm flex gap-1 items-center px-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </p>
        )}
      </div>
      <div className="bg-gradient-to-t h-[120px] from-black opacity-[0.95067] z-[49] to-transparent absolute bottom-0 left-0 right-0" />
    </Link>
  );
};

export default MovieContainer;
