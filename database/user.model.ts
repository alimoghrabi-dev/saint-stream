import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const userSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  bio: {
    type: String,
  },
  picture: {
    type: String,
  },
  saved: [
    {
      type: Schema.Types.ObjectId,
      ref: "Watchlist",
    },
  ],
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", userSchema);

export default User;
