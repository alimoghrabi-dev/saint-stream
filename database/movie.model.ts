import { Schema, models, model, Document } from "mongoose";

export interface IMovie extends Document {
  id: number;
  movieName: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  rate: number;
  voteCount: number;
  release_date: string;
}

const movieSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  movieName: {
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
  isSaved: {
    type: String,
  },
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
