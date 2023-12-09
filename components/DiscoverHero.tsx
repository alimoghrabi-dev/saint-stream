"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { Button } from "./ui/button";
import { PlayCircle } from "lucide-react";
import "swiper/css/pagination";
import "swiper/css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const [movieList, setMovieList] = useState([]);

  let isWindowWide =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches
      ? true
      : false;

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
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2`,
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
    <div className="bg-black">
      <div className="relative">
        <Swiper
          autoplay={{
            delay: 12000,
            disableOnInteraction: false,
          }}
          style={{
            //@ts-ignore
            "--swiper-pagination-color": "#fff",
            "--swiper-pagination-bullet-size": "12px",
            "--swiper-pagination-bullet-inactive-color": "#9fff9f",
            "--swiper-pagination-bullet-inactive-opacity": "0.55",
            "--swiper-pagination-bullet-opacity": "1",
            "--swiper-pagination-bullet-horizontal-gap": "8px",
            "--swiper-pagination-bullet-vertical-gap": "8px",
          }}
          spaceBetween={5}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          effect="coverflow">
          {movieList.slice(0, 5).map(
            (
              movie: {
                id: number;
                title: string;
                release_date: string;
                overview: string;
                backdrop_path: string;
                poster_path: string;
                vote_average: number;
                vote_count: number;
              },
              index
            ) => (
              <SwiperSlide key={index}>
                <Image
                  src={`https://image.tmdb.org/t/p/original/${
                    isWindowWide ? movie.backdrop_path : movie.poster_path
                  }`}
                  alt="movie"
                  width={1900}
                  height={1900}
                  className="h-[100vh] w-full object-cover z-40"
                />
                <div className="mb-2 absolute bottom-12 backdrop-blur-[3px] bg-black bg-opacity-25 p-2 pl-3 rounded-sm mx-4">
                  <h2 className="text-gray-100 font-bold text-xl sm:text-3xl text-shadow max-w-[280px] sm:max-w-xl">
                    {movie.title}
                  </h2>
                  <p className="text-gray-300 font-normal text-sm text-shadow py-3 px-4">
                    {movie.release_date}
                  </p>
                  <p className="text-gray-200 font-medium line-clamp-3 sm:line-clamp-none text-[12px] sm:text-sm tracking-wide leading-normal text-shadow max-w-[275px] sm:max-w-md md:max-w-2xl lg:max-w-3xl mt-2">
                    {movie.overview}
                  </p>
                  <div className="flex items-center justify-start gap-4 pt-4 pb-1">
                    <Link href={`/movie/${movie.id}#trailer`}>
                      <Button className="gap-2 border-primary">
                        <PlayCircle className="w-5 h-5" />
                        Watch Trailer
                      </Button>
                    </Link>
                    <Link href={`/movie/${movie.id}`}>
                      <Button
                        variant={"ghost"}
                        className="border border-white text-white hover:bg-white/10 hover:text-white gap-2 flex items-center">
                        See More
                      </Button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
