"use server";

import { connectToDatabase } from "@/database/mongo";
import Movie from "@/database/movie.model";

export async function addMovieToDb(params: {
  id: number;
  movieName: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  rate: number;
  voteCount: number;
  release_date: string;
}) {
  try {
    connectToDatabase();

    const {
      id,
      movieName,
      overview,
      poster_path,
      backdrop_path,
      rate,
      voteCount,
      release_date,
    } = params;

    const movie = await Movie.findOne({
      id,
    });

    if (movie?._id) {
      return null;
    } else {
      await Movie.create({
        id,
        movieName,
        overview,
        poster_path,
        backdrop_path,
        rate,
        voteCount,
        release_date,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
