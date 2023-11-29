import { Schema, models, model, Document } from "mongoose";

export interface IMovie extends Document {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  addedByUsers: Schema.Types.ObjectId[];
  rate: number;
  voteCount: number;
  release_date: string;
}

const movieSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
  },
  poster_path: {
    type: String,
  },
  backdrop_path: {
    type: String,
  },
  addedByUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
  ],
  rate: {
    type: Number,
  },
  voteCount: {
    type: Number,
  },
  release_date: {
    type: String,
  },
});

const Movie = models.Movie || model("Movie", movieSchema);

export default Movie;
