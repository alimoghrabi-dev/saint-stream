"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createComment } from "@/lib/actions/comment.actions";
import { usePathname } from "next/navigation";
import Image from "next/image";
import FetchComment from "./FetchComment";

const CommentsSection = ({
  movie,
  mongoUser,
  movieFromDB,
  movieComments,
}: any) => {
  const pathname = usePathname();

  const [comment, setComment] = useState({
    prompt: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handlePromptChange(event: ChangeEvent<HTMLInputElement>) {
    setComment({ ...comment, [event.target.name]: event.target.value });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitting(true);
    try {
      await createComment({
        userId: mongoUser?._id,
        movie,
        prompt: comment.prompt,
        path: pathname,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      setComment({
        prompt: "",
      });
    }
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="w-full flex items-center gap-2.5 border-b border-gray-500/40 pb-5">
        <Input
          id="prompt"
          name="prompt"
          onChange={handlePromptChange}
          value={comment.prompt}
          placeholder="Add a comment"
          className="bg-black/90 text-gray-200 font-medium border-2 border-gray-400/70 transition-all"
        />
        <Button disabled={submitting} type="submit" className="w-[100px]">
          {submitting ? <div className="loading-spinner" /> : "Comment"}
        </Button>
      </form>

      {movieFromDB?.comments?.length === 0 && (
        <p className="text-xl font-medium text-gray-500 py-3.5 text-center">
          Comment Section Is Empty!
        </p>
      )}

      {movieComments.map((comment: any) => {
        return <FetchComment key={comment._id} comment={comment} />;
      })}
    </>
  );
};

export default CommentsSection;
