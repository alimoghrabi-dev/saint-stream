import { getAllPopularComments } from "@/lib/actions/comment.actions";
import { calculateElapsedTime } from "@/lib/utils";
import { Heart, Star } from "lucide-react";
import Image from "next/image";

const PopularDiscussions = async () => {
  const comments = await getAllPopularComments();

  return (
    <section className="flex flex-col gap-y-12 px-5 md:px-8 lg:px-12 py-8 pt-8 lg:pt-12">
      <div className="w-full flex items-center justify-start">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-100 flex gap-1.5 items-center">
          <Star className="text-yellow-500 fill-yellow-500 w-5 h-5 sm:w-6 sm:h-6" />
          Popular Discussions
        </h1>
      </div>
      {comments?.length === 0 ? (
        <p className="text-gray-400 text-lg font-semibold pt-5">
          No comments Available
        </p>
      ) : (
        <div className="space-y-7">
          {comments?.map((comment: any) => (
            <div
              key={comment._id}
              className="flex w-full gap-3 lg:w-1/2 min-h-[150px] justify-between border-2 border-gray-500/20 rounded-2xl px-3 sm:px-4 py-4">
              <div className="flex flex-col items-start justify-between w-full">
                <h3 className="text-[17px] sm:text-lg md:text-xl font-semibold text-gray-100 line-clamp-2 max-w-full">
                  {comment.prompt}
                </h3>
                <div className="w-full flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5">
                    <Image
                      src={comment.userPicture}
                      alt="user"
                      width={31}
                      height={31}
                      className="rounded-full ring-1 ring-primary/30"
                    />
                    <p className="text-gray-200 text-[12px] sm:text-sm font-medium capitalize cursor-pointer bg-primary/80 rounded-full py-[3px] px-1.5 sm:px-2">
                      @{comment.username}
                    </p>
                    <p className="text-[10px] sm:text-[12px] font-medium text-gray-500">
                      {calculateElapsedTime(comment.createdAt)}
                    </p>
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="text-gray-300 w-4 h-4 cursor-pointer" />
                    <p className="text-gray-200 font-medium text-sm">0</p>
                  </span>
                </div>
              </div>
              <div className="h-[130px] w-[120px] relative">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${comment.moviePicture}`}
                  fill
                  alt="movie poster"
                  className="rounded-xl object-fill w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularDiscussions;
