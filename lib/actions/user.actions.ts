"use server";

import Account from "@/database/accounts.model";
import { connectToDatabase } from "@/database/mongo";
import { revalidatePath } from "next/cache";

export async function getUserById(userParams: { clerkId: string | null }) {
  try {
    connectToDatabase();

    const { clerkId } = userParams;

    const user = await Account.findOne({ clerkId });

    if (!user) return null;

    return { user };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userParams: {
  clerkId: string | null;
  name: string;
  username: string;
  email: string;
  picture: string;
}) {
  try {
    connectToDatabase();

    const newUser = await Account.create(userParams);

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

    await Account.findOneAndUpdate({ clerkId }, updateData, {
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

    const user = await Account.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    const deletedUser = await Account.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getWatchlistLength(clerkId: string | null) {
  try {
    connectToDatabase();

    const user = await Account.findOne({ clerkId });

    if (!user) {
      return null;
    }

    return user.watchList.length;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
