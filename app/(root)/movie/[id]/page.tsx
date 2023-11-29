import SingleMovie from "@/components/shared/singleMovie";
import { checkExist } from "@/lib/actions/movie.actions";
import { auth } from "@clerk/nextjs";

const Page = async ({ params }: any) => {
  const { userId } = auth();

  const movieExists = await checkExist({
    id: params.id,
    userId: userId,
  });

  return (
    <div className="bg-black">
      <SingleMovie params={params} movieExists={movieExists} />
    </div>
  );
};

export default Page;
