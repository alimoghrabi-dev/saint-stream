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

export async function getAllUsers() {
  try {
    connectToDatabase();

    const user = await Account.find({});

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function followUser(params: any) {
  try {
    connectToDatabase();

    const { clerkId, userId, path } = params;

    const userFollowed = await Account.findOne({ clerkId });
    const userFollowing = await Account.findOne({ clerkId: userId });

    await Account.findOneAndUpdate(
      { clerkId },
      {
        $push: { followers: userFollowing._id },
      }
    );

    await Account.findOneAndUpdate(
      { clerkId: userId },
      {
        $push: { following: userFollowed._id },
      }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function UnFollowUser(params: any) {
  try {
    connectToDatabase();

    const { clerkId, userId, path } = params;

    const userFollowed = await Account.findOne({ clerkId });
    const userFollowing = await Account.findOne({ clerkId: userId });

    await Account.findOneAndUpdate(
      { clerkId },
      {
        $pull: { followers: userFollowing._id },
      }
    );

    await Account.findOneAndUpdate(
      { clerkId: userId },
      {
        $pull: { following: userFollowed._id },
      }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getFollowingUsers(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    if (!userId) {
      return null;
    }

    const user = await Account.findOne({ clerkId: userId });
    const usersFollowing = await Account.find({ _id: { $in: user.following } });

    return usersFollowing;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getFollowersUsers(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    if (!userId) {
      return null;
    }

    const user = await Account.findOne({ clerkId: userId });
    const usersFollowing = await Account.find({ _id: { $in: user.followers } });

    return usersFollowing;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
