"use client";

import { ChevronLeft, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { updateUser } from "@/lib/actions/user.actions";
import { ChangeEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const initialState = {
  username: "",
  bio: "",
  imageSrc: "",
};

const EditProfile = ({ user }: any) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [state, setState] = useState(initialState);

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function handleBioChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  const setValue = (id: any, value: any) => {
    setState((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await updateUser({
        clerkId: user.clerkId,
        updateData: {
          username: state.username == "" ? user.username : state.username,
          bio: state.bio,
        },
        path: pathname,
      });

      router.push(`/profile/${user.clerkId}`);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex items-center justify-between px-10 sm:px-20 py-7">
        <h3 className="text-gray-200 font-semibold text-base sm:text-lg border-b border-gray-400/20 pb-3 sm:pr-5">
          Edit Profile
        </h3>
        <Link
          href={`/profile/${user.clerkId}`}
          className="text-primary text-base sm:text-lg font-semibold border-b border-gray-400/20 pb-3 sm:pl-5 flex gap-0 items-center hover:text-primary/80 transition duration-150">
          <ChevronLeft className="w-[22px] h-[22px] mt-0.5" />
          Go Back
        </Link>
      </div>

      <form
        onSubmit={onSubmit}
        className="w-[65%] sm:w-[50%] md:w-[38%] lg:w-[28%] flex flex-col gap-10 items-center justify-center mt-8 pb-10">
        <div className="w-full flex items-center justify-center flex-col gap-4">
          <h4 className="text-base font-semibold text-gray-100">
            Change Avatar
          </h4>
          <Image
            src={user.picture}
            alt={user.username}
            width={100}
            height={100}
            className="rounded-full border-2 border-primary/30"
          />
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col items-start gap-1.5">
            <label htmlFor="username" className="text-gray-100">
              Name
            </label>
            <Input
              type="text"
              name="username"
              onChange={handleNameChange}
              value={state.username}
              id="username"
              placeholder={user.username}
              className="bg-black/90 border-2 rounded-lg border-gray-500 transition-all shadow-none outline-none placeholder:text-gray-600 text-gray-100 font-medium"
            />
          </div>
          <div className="w-full flex flex-col items-start gap-1.5">
            <label htmlFor="bio" className="text-gray-100">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              onChange={handleBioChange}
              value={state.bio}
              rows={5}
              placeholder="Enter your bio"
              className="bg-black/90 px-4 py-2 border-2 w-full rounded-lg border-gray-500 transition-all shadow-none outline-none placeholder:text-gray-600 text-gray-100 font-medium"
            />
          </div>
        </div>
        <Button
          disabled={isSubmitting}
          type="submit"
          className="px-6 py-2.5 text-[15px] font-medium rounded-l w-full">
          {isSubmitting ? (
            <div className="loading-spinner" />
          ) : (
            <>
              <Edit className="w-5 h-5 mr-3" />
              Edit Your Profile
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
