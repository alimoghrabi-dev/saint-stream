"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MovieContainerOfTheWeek from "../MovieContainerOfTheWeek";
import { useRouter } from "next/navigation";

const PopularOfTheWeek = () => {
  const router = useRouter();
  const [movieList, setMovieList] = useState([]);
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

  const fetchMovies = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2Q3N2FjOTY5NjZlZjc0ZDkxYjIzNjI0Mjc1NzgwOCIsInN1YiI6IjY0YzkyMDE1MWZhMWM4MDE1MTQ0ZTVmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.51uambKSTI_HsvwnRZ_uzbC4QU7aDR74qlVD5Dy7dyA",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=ccd77ac96966ef74d91b236242757808&language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMovieList(response.results);
      })

      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchMovies();
  }, [router]);

  return (
    <div className="space-y-1 py-12 pt-24 lg:pt-8 lg:py-2">
      <div className="w-full flex items-center justify-between px-10 pt-1 pb-2">
        <h3 className="text-white font-semibold text-2xl">
          Popular of the week
        </h3>
        <span className="flex items-center gap-3">
          <ArrowLeft
            onClick={() => handleClick("left")}
            className="text-gray-100 transition z-[60] h-8 w-8 p-1.5 bg-gray-600 hover:bg-gray-600/90 rounded-full cursor-pointer"
          />
          <ArrowRight
            onClick={() => handleClick("right")}
            className="text-gray-100 transition z-[60] h-8 w-8 p-1.5 bg-gray-600 rounded-full hover:bg-gray-600/90 cursor-pointer"
          />
        </span>
      </div>
      <div className="relative">
        <div
          className="flex items-center scrollbar-hide overflow-x-scroll pl-10 gap-x-12 pb-8 pt-2 pr-4"
          ref={rowRef}>
          {movieList.map((movie: any, index) => (
            <MovieContainerOfTheWeek key={index} movie={movie} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularOfTheWeek;
