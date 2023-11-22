"use server";

import { connectToDatabase } from "@/database/mongo";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function getUserById(userParams: { clerkId: string | null }) {
  try {
    connectToDatabase();

    const { clerkId } = userParams;

    const user = await User.findOne({ clerkId });

    if (!user) {
      return null;
    }

    return { user };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userParams: any) {
  try {
    connectToDatabase();

    const newUser = await User.create(userParams);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: any) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: { clerkId: string }) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
