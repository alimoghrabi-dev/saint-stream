"use server";

import Account from "@/database/accounts.model";
import Comment from "@/database/comment.model";
import { connectToDatabase } from "@/database/mongo";
import Movie from "@/database/movie.model";
import { revalidatePath } from "next/cache";

export async function createComment(params: any) {
  try {
    connectToDatabase();

    const { movieId, userId, prompt, path } = params;

    const user = await Account.findOne({ clerkId: userId });

    if (!user) {
      return null;
    }

    const movie = await Movie.findOne({ id: movieId });

    await Comment.create({
      user,
      movie,
      prompt,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
