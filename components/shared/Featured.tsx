"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface IMovie {
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
}

const Featured = () => {
  const router = useRouter();
  const [movies, setMovie] = useState([]);
  const [background, setBackground] = useState<IMovie>({
    title: "",
    overview: "",
    backdrop_path: "",
    poster_path: "",
    release_date: "",
  });
  const rowRef = useRef<HTMLDivElement>(null);

  let isWindowWide =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches
      ? true
      : false;

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
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=ccd77ac96966ef74d91b236242757808&language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMovie(response.results);
        setBackground(response?.results[0]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchMovies();
  }, [router]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 pl-12 py-24 relative space-y-10 lg:space-y-0">
      <div className="z-20 flex flex-col justify-between items-start">
        <div className="flex flex-col items-start gap-2.5 mb-8 lg:mb-0">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-100">
            Featured in <span className="text-primary">SaintStream</span>
          </h2>
          <p className="text-base font-semibold text-gray-300 text-shadow">
            Best featured for you today.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-4xl text-white font-semibold text-shadow">
            {background.title}
          </h2>
          <span className="flex gap-2 px-4">
            <p className="text-gray-300 font-medium text-base text-shadow">
              {background.release_date}
            </p>
          </span>
          <p className="text-gray-300 line-clamp-3 sm:line-clamp-4 text-sm sm:text-base font-semibold max-w-lg text-shadow">
            {background.overview}
          </p>
        </div>
      </div>
      <div className={`group relative z-20 transition-opacity`}>
        <ChevronRight
          onClick={() => handleClick("right")}
          className="absolute text-gray-100 top-[39%] opacity-0 transition z-[60] right-2 m-auto h-9 w-9 p-2 bg-gray-500 rounded-full hover:bg-gray-500/90 cursor-pointer group-hover:opacity-100"
        />
        <div
          ref={rowRef}
          className="flex items-start scrollbar-hide overflow-x-scroll gap-x-10 pr-5">
          {movies?.map((movie: any) => {
            return (
              <div
                onClick={() => {
                  setBackground(movie);
                }}
                key={movie?.id}
                className={`relative min-h-[280px] min-w-[200px] transition-all shadow-lg cursor-pointer rounded-lg ${
                  background.title === movie.title
                    ? "border-[3px] border-primary"
                    : "border-[2px] border-primary/25 hover:backdrop-contrast-50"
                }`}>
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                  alt={movie?.title}
                  fill
                  className="w-full h-full rounded-[8px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 px-3.5 pb-3 z-50">
                  <p className="text-gray-100 text-base text-shadow font-semibold line-clamp-2">
                    {movie?.title}
                  </p>
                  <p className="text-white text-sm flex gap-1 items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                </div>
                <div className="bg-gradient-to-t h-[140px] from-black opacity-[0.98067] z-[49] to-transparent absolute bottom-0 rounded-b-[5px] left-0 right-0" />
              </div>
            );
          })}
        </div>
        <ChevronLeft
          onClick={() => handleClick("left")}
          className="absolute text-gray-100 top-[39%] opacity-0 transition z-[60] left-4 m-auto h-9 w-9 p-2 bg-gray-500 rounded-full hover:bg-gray-500/90 cursor-pointer group-hover:opacity-100"
        />
        <div className="bg-gradient-to-l w-[25px] from-black opacity-[0.82067] z-[16] to-transparent absolute top-0 right-0 bottom-0" />
        <div className="bg-gradient-to-r w-[25px] from-black opacity-[0.82067] rounded-[4px] z-[16] to-transparent absolute top-0 left-0 bottom-0" />
      </div>

      <Image
        src={`https://image.tmdb.org/t/p/original/${
          isWindowWide ? background.backdrop_path : background.poster_path
        }`}
        alt={background.title}
        fill
        className={`absolute inset-0 z-1 object-fill opacity-70 transition-opacity`}
      />

      <div className="bg-gradient-to-b h-[300px] from-black opacity-[0.82067] z-[15] to-transparent absolute top-0 left-0 right-0" />
    </div>
  );
};

export default Featured;
