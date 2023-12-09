import { Schema, models, model, Document } from "mongoose";

export interface IComment extends Document {
  user: Schema.Types.ObjectId;
  movie: Schema.Types.ObjectId;
  username: string;
  userPicture: string;
  movieTitle: string;
  moviePicture: string;
  prompt: string;
  createdAt: Date;
}

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
  },
  username: {
    type: String,
    required: true,
  },
  userPicture: {
    type: String,
    required: true,
  },
  movieTitle: {
    type: String,
    required: true,
  },
  moviePicture: {
    type: String,
    required: true,
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
