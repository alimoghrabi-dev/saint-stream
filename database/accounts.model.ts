import { Schema, models, model, Document } from "mongoose";

export interface IAccount extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  watchList: Schema.Types.ObjectId[];
  following: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const accountSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
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
  watchList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const Account = models.Account || model("Account", accountSchema);

export default Account;
