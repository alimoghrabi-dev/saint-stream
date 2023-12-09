import { Schema, models, model, Document } from "mongoose";
import { IAccount } from "./accounts.model";
import { IMovie } from "./movie.model";

export interface IComment extends Document {
  user: IAccount;
  movie: IMovie;
  prompt: string;
  createdAt: Date;
}

const commentSchema = new Schema({
  user: {
    type: Object,
    required: true,
    ref: "Account",
  },
  movie: {
    type: Object,
    required: true,
    ref: "Movie",
  },
  prompt: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
