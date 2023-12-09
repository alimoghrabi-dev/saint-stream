"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createComment } from "@/lib/actions/comment.actions";
import { usePathname } from "next/navigation";

const CommentsSection = ({ movieId, userId }: any) => {
  const pathname = usePathname();

  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handlePromptChange(event: ChangeEvent<HTMLInputElement>) {
    setComment(event.target.value);
  }

  const submitPrompt = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      await createComment({
        userId,
        movieId,
        comment,
        path: pathname,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={submitPrompt}
        className="w-full flex items-center gap-2.5">
        <Input
          onChange={handlePromptChange}
          value={comment}
          placeholder="Add a comment"
          className="bg-black/90 text-gray-200 font-medium"
        />
        <Button disabled={submitting} type="submit">
          {submitting ? <div className="loading-spinner" /> : "Post"}
        </Button>
      </form>
      <p className="text-xl font-semibold text-gray-500">
        Comment Section Is Empty!
      </p>
    </>
  );
};

export default CommentsSection;
