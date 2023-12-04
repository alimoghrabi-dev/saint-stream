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
      className="relative min-h-[240px] min-w-[160px] cursor-pointer rounded-lg">
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
        fill
        className="w-full h-full rounded-[7px] object-cover hover:opacity-75 transition ease-in-out border border-primary/[0.15] shadow-lg shadow-primary/20"
      />
      <div className="absolute bottom-2 left-1 flex flex-col justify-start gap-1 z-50 pl-0.5">
        <h4
          className={`${
            rate ? "mb-0" : "mb-1 ml-1"
          } text-base font-semibold text-gray-100 text-shadow line-clamp-2`}>
          {movie.title}
        </h4>
        {rate && (
          <p className="text-white text-sm flex gap-1 items-center px-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </p>
        )}
      </div>
      <div className="bg-gradient-to-t h-[95px] from-black opacity-[0.98067] z-[49] to-transparent absolute bottom-px rounded-b-[5px] left-px right-px" />
    </Link>
  );
};

export default MovieContainer;
