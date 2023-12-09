"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Share2Icon, ArrowLeft, ArrowRight } from "lucide-react";
import MovieContainer from "@/components/MovieContainer";
import { addMovieToDb, removeMovieFromList } from "@/lib/actions/movie.actions";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import CommentsSection from "./CommentsSection";

const SingleMovie = ({ params, movieExists, userIdFromServer }: any) => {
  const { userId } = useAuth();

  const pathname = usePathname();
  const rowRef = useRef<HTMLDivElement>(null);
  const [movie, setMovie] = useState({
    id: 0,
    title: "",
    overview: "",
    poster_path: "",
    backdrop_path: "",
    addedByUsers: [],
    rate: 0,
    voteCount: 0,
    release_date: "",
  });

  const [movieTrailer, setMovieTrailer] = useState(null);
  const [movieSimilar, setMovieSimilar] = useState([]);

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

  let isWindowWide =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches
      ? true
      : false;

  const options = { method: "GET", headers: { accept: "application/json" } };

  fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=ccd77ac96966ef74d91b236242757808&language=en-US`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      setMovie(response);
    })
    .catch((err) => console.error(err));

  fetch(
    `https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=ccd77ac96966ef74d91b236242757808&language=en-US`,
    options
  )
    .then((response) => response.json())
    .then((response) => setMovieSimilar(response.results))
    .catch((err) => console.error(err));

  useEffect(() => {
    const fetchTrailer = async () => {
      const videosUrl = `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=ccd77ac96966ef74d91b236242757808`;
      const videosResponse = await fetch(videosUrl);
      const videosData = await videosResponse.json();

      const trailer = videosData.results.find(
        (video: { type: string }) => video.type === "Trailer"
      );
      if (trailer) {
        setMovieTrailer(trailer.key);
      }
    };

    fetchTrailer();
  });

  const handleAddToList = async () => {
    try {
      await addMovieToDb({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        userId,
        rate: movie.rate,
        voteCount: movie.voteCount,
        release_date: movie.release_date,
        path: pathname,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromList = async () => {
    try {
      await removeMovieFromList({
        userId,
        movieId: movie.id,
        path: pathname,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black">
      <div className="relative">
        <div className="bg-gradient-to-b h-[160px] from-black opacity-[0.90067] z-[49] to-transparent absolute top-0 left-0 right-0" />
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            isWindowWide ? movie.backdrop_path : movie.poster_path
          }`}
          alt="movie"
          width={1900}
          height={1900}
          className="h-[100vh] w-full object-cover z-40"
        />
        <div className="mb-2 absolute bottom-12 p-2 px-12 left-0 right-0 z-50">
          <h2 className="text-gray-100 font-bold text-xl sm:text-3xl text-shadow max-w-[280px] sm:max-w-xl">
            {movie.title}
          </h2>
          <p className="text-gray-300 font-normal text-sm text-shadow py-3 px-4">
            {movie.release_date}
          </p>
          <div className="w-full flex items-center justify-start gap-4 pt-2 pb-1">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  onClick={movieExists ? handleRemoveFromList : handleAddToList}
                  variant={"ghost"}
                  className={`border ${
                    movieExists
                      ? "border-[goldenrod] text-[goldenrod] hover:text-[goldenrod] hover:bg-[goldenrod]/10"
                      : "border-white text-white hover:text-white hover:bg-white/10"
                  }    gap-2 px-6`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="16"
                    viewBox="0 0 16 20"
                    fill={`${movieExists ? "goldenrod" : "none"}`}>
                    <path
                      d="M1 3C1 1.89543 1.89543 1 3 1H13C14.1046 1 15 1.89543 15 3V19L8 15.5L1 19V3Z"
                      stroke={`${movieExists ? "goldenrod" : "white"}`}
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {movieExists ? "Remove From List" : "Add To List"}
                </Button>
              </div>
              <div className="flex items-center">
                <Button
                  variant={"ghost"}
                  className="flex items-center justify-center py-1.5 px-2.5 gap-0 sm:gap-1.5 text-gray-100">
                  <Share2Icon className="w-6 h-6 sm:w-5 sm:h-5" />
                  <p className="text-base font-medium hidden sm:block">Share</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-t h-[320px] from-black opacity-[0.95067] z-[49] to-transparent absolute bottom-0 left-0 right-0" />
      </div>
      <div className="w-full flex flex-col pt-2 pb-8 gap-8 px-4 sm:px-8 md:px-12">
        <div className="w-full flex flex-col items-start gap-2.5">
          <h4 className="text-gray-100 text-lg font-semibold">Story Line</h4>
          <p className="text-gray-300 font-medium text-sm">{movie.overview}</p>
        </div>
        <div id="trailer" className="w-full bg-gray-800 bg-opacity-70 h-px" />
        {movieTrailer && (
          <div className="w-full flex flex-col items-start gap-4">
            <h4 className="text-gray-100 text-xl font-semibold">
              Movie Trailer
            </h4>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${movieTrailer}`}
              title="Trailer"
              allowFullScreen
              className="rounded-xl ring-2 ring-primary/50 max-w-full md:max-w-[80%]"
            />
          </div>
        )}
        <div className="w-full bg-gray-800 bg-opacity-70 h-px mt-2" />
        <div className="space-y-4">
          <h4 className="text-gray-100 text-lg font-semibold">
            Movies you may like
          </h4>
          <div className="group relative">
            <ArrowRight
              onClick={() => handleClick("right")}
              className="absolute text-gray-100 top-[39%] opacity-0 transition z-[60] right-4 m-auto h-8 w-8 p-1.5 bg-primary rounded-full hover:bg-primary/90 cursor-pointer group-hover:opacity-100"
            />
            <div
              className="flex items-center scrollbar-hide overflow-x-scroll gap-x-6 pb-8 pt-2 pr-4"
              ref={rowRef}>
              {movieSimilar.map((movie: any) => (
                <MovieContainer key={movie.id} movie={movie} rate />
              ))}
            </div>
            <ArrowLeft
              onClick={() => handleClick("left")}
              className="absolute text-gray-100 top-[39%] opacity-0 transition z-[60] left-4 m-auto h-8 w-8 p-1.5 bg-primary hover:bg-primary/90 rounded-full cursor-pointer group-hover:opacity-100"
            />
            <div className="bg-gradient-to-l w-[60px] h-[200px] from-black opacity-[0.95067] z-[49] to-transparent absolute top-0 bottom-0 right-0" />
          </div>
        </div>
        <div className="w-full xl:w-[75%] flex flex-col space-y-8">
          <h4 className="text-gray-100 text-lg sm:text-xl font-semibold flex gap-2">
            <p> What People Say About</p>
            <p className="text-primary">{movie.title}</p>
          </h4>
          <CommentsSection movieId={movie.id} userId={userIdFromServer} />
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
