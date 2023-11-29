"use server";

import Account from "@/database/accounts.model";
import { connectToDatabase } from "@/database/mongo";
import Movie from "@/database/movie.model";
import { revalidatePath } from "next/cache";

export async function addMovieToDb(params: {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  rate: number;
  voteCount: number;
  userId: string | undefined | null;
  release_date: string;
  path: string;
}) {
  try {
    connectToDatabase();

    const {
      id,
      title,
      overview,
      poster_path,
      backdrop_path,
      userId,
      rate,
      voteCount,
      release_date,
      path,
    } = params;

    const user = await Account.findOne({
      clerkId: userId,
    });

    const movie = await Movie.findOne({
      id,
    });

    if (movie?._id) {
      const movie = await Movie.findOne({
        id,
      });

      if (movie.addedByUsers.includes(user._id)) {
        return;
      }

      await Movie.findOneAndUpdate(
        { id },
        {
          $push: { addedByUsers: user._id },
        }
      );

      if (user.watchList.includes(movie._id)) {
        return;
      }
      await Account.findOneAndUpdate(
        { clerkId: userId },
        {
          $push: { watchList: movie._id },
        }
      );
    } else {
      await Movie.create({
        id,
        title,
        overview,
        poster_path,
        backdrop_path,
        rate,
        voteCount,
        release_date,
      });

      const movie = await Movie.findOne({
        id,
      });

      await Movie.findOneAndUpdate(
        { id },
        {
          $push: { addedByUsers: user._id },
        }
      );

      await Account.findOneAndUpdate(
        {
          clerkId: userId,
        },
        {
          $push: { watchList: movie._id },
        }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function checkExist(params: {
  id: number;
  userId: string | undefined | null;
}) {
  try {
    connectToDatabase();

    const { id, userId } = params;

    const movie = await Movie.findOne({
      id,
    });

    const user = await Account.findOne({
      clerkId: userId,
    });

    if (movie?.addedByUsers.includes(user._id)) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getWatchlistMovies(params: { clerkId: string | null }) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await Account.findOne({
      clerkId,
    });

    if (!user) {
      return null;
    }

    const movies = await Movie.find({
      _id: { $in: user.watchList },
    });

    return movies;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function removeMovieFromList(params: {
  userId: string | undefined | null;
  movieId: number;
  path: string;
}) {
  try {
    connectToDatabase();

    const { userId, movieId, path } = params;

    const user = await Account.findOne({
      clerkId: userId,
    });

    if (!user) {
      return null;
    }

    const movie = await Movie.findOne({
      id: movieId,
    });

    await Account.findOneAndUpdate(
      { clerkId: userId },
      {
        $pull: { watchList: movie._id },
      }
    );

    await Movie.findOneAndUpdate(
      { id: movieId },
      {
        $pull: { addedByUsers: user._id },
      }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
