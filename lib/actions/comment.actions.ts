"use server";

import Account from "@/database/accounts.model";
import Comment from "@/database/comment.model";
import { connectToDatabase } from "@/database/mongo";
import Movie from "@/database/movie.model";
import { revalidatePath } from "next/cache";

export async function createComment(params: {
  movie: any;
  userId: any;
  prompt: string;
  path: string;
}) {
  try {
    connectToDatabase();

    const { movie, userId, prompt, path } = params;

    const user = await Account.findById(userId);

    const movieDB = await Movie.findOne({ id: movie.id });

    console.log(user.username);

    const newComment = await Comment.create({
      user,
      username: user.username,
      userPicture: user.picture,
      prompt,
    });

    await Account.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          comments: newComment,
        },
      }
    );

    if (movieDB?._id) {
      await Movie.findOneAndUpdate(
        { id: movie.id },
        {
          $push: {
            comments: newComment,
          },
        }
      );

      await Comment.findByIdAndUpdate(newComment._id, {
        $push: {
          movie: movieDB,
        },
      });
    } else {
      const movieDBInfo = await Movie.create({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        rate: movie.rate,
        voteCount: movie.voteCount,
        comments: newComment,
        release_date: movie.release_date,
      });

      await Comment.findByIdAndUpdate(newComment._id, {
        $push: {
          movie: movieDBInfo,
        },
      });
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getComments(params: any) {
  try {
    connectToDatabase();

    const { movieId } = params;

    const movieComments = await Movie.findOne({ id: movieId });

    const comments = await Comment.find({
      _id: {
        $in: movieComments?.comments,
      },
    });

    return comments;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
