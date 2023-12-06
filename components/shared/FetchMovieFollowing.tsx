"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import MovieContainer from "../MovieContainer";

const FetchMovieFollowing = ({ movies }: any) => {
  const rowRef = useRef(null);

  const handleClick = (direction: string) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      //@ts-ignore
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="group relative">
      <ArrowRight
        onClick={() => handleClick("right")}
        className="absolute text-gray-100 top-[39%] opacity-0 transition z-[60] right-12 m-auto h-8 w-8 p-1.5 bg-primary rounded-full hover:bg-primary/90 cursor-pointer group-hover:opacity-100"
      />

      <div
        className="flex items-center scrollbar-hide overflow-x-scroll pl-10 gap-x-6 pb-8 pt-2 pr-4"
        ref={rowRef}>
        {movies.slice(0, 19).map((movie: any) => (
          <MovieContainer key={movie.id} movie={movie} />
        ))}
      </div>

      <ArrowLeft
        onClick={() => handleClick("left")}
        className="absolute text-gray-100 top-[39%] opacity-0 transition z-[60] left-12 m-auto h-8 w-8 p-1.5 bg-primary hover:bg-primary/90 rounded-full cursor-pointer group-hover:opacity-100"
      />
    </div>
  );
};

export default FetchMovieFollowing;
