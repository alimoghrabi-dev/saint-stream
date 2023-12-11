import { calculateElapsedTime } from "@/lib/utils";
import Image from "next/image";

const FetchComment = ({ comment, index, movieComments }: any) => {
  return (
    <div className="flex flex-col gap-y-2.5">
      <div className={`flex items-center gap-3`}>
        <Image
          src={comment.userPicture}
          alt="user"
          width={45}
          height={45}
          className="rounded-full ring-2 ring-primary/30"
        />

        <div className="bg-gray-700/70 w-[1px] h-12" />
        <div className="w-full flex flex-col gap-2">
          <span className="flex items-center gap-2">
            <p className="text-gray-200 text-[12px] font-medium capitalize cursor-pointer bg-primary/80 rounded-full py-[3px] px-2">
              @{comment.username}
            </p>
            <p className="text-[12px] font-medium text-gray-500">
              {calculateElapsedTime(comment.createdAt)}
            </p>
          </span>
          <p className="text-gray-300 font-medium text-[12px] max-w-full sm:max-w-[50%]">
            {comment.prompt}
          </p>
        </div>
      </div>
      {movieComments.length - 1 === index ? null : (
        <div className="w-1/2 h-px bg-gray-600/40 mt-3" />
      )}
    </div>
  );
};

export default FetchComment;
