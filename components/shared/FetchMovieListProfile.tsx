"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";
import MovieContainer from "../MovieContainer";
import { useRef } from "react";

interface Props {
  watchlistMovies: any;
}

const FetchMovieListProfile = ({ watchlistMovies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleClick = (direction: string) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="group relative">
      <div className="bg-gradient-to-r w-[65px] from-[#1a1a1a] opacity-[0.90067] z-[49] to-transparent absolute top-0 left-0 bottom-0" />
      <ArrowRight
        onClick={() => handleClick("right")}
        className="absolute text-gray-100 top-[39%] opacity-0 transition z-[60] right-12 m-auto h-8 w-8 p-1.5 bg-primary rounded-full hover:bg-primary/90 cursor-pointer group-hover:opacity-100"
      />
      <div
        className="flex items-center scrollbar-hide overflow-x-scroll pl-10 gap-x-6 pb-8 pt-2 pr-4"
        ref={rowRef}>
        {watchlistMovies?.map((movie: any) => (
          <MovieContainer key={movie.id} movie={movie} />
        ))}
      </div>
      <ArrowLeft
        onClick={() => handleClick("left")}
        className="absolute text-gray-100 top-[39%] opacity-0 transition z-[60] left-12 m-auto h-8 w-8 p-1.5 bg-primary hover:bg-primary/90 rounded-full cursor-pointer group-hover:opacity-100"
      />
      <div className="bg-gradient-to-l w-[55px] from-[#1a1a1a] opacity-[0.90067] z-[49] to-transparent absolute top-0 right-0 bottom-0" />
    </div>
  );
};

export default FetchMovieListProfile;
