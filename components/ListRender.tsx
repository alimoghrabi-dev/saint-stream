import { getWatchlistLength } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const ListRender = async () => {
  const { userId: clerkId } = auth();

  const watchListLength = await getWatchlistLength(clerkId);

  return (
    <Link href={"/watch-list"} className="mr-2 relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="19"
        viewBox="0 0 16 20"
        fill={`${watchListLength > 0 ? "goldenrod" : "none"}`}>
        <path
          d="M1 3C1 1.89543 1.89543 1 3 1H13C14.1046 1 15 1.89543 15 3V19L8 15.5L1 19V3Z"
          stroke={`${watchListLength > 0 ? "goldenrod" : "white"}`}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      {watchListLength > 0 && (
        <span className="absolute -top-3 -right-2.5 text-white text-[10px] font-bold bg-primary rounded-full p-0.5 px-[7px]">
          {watchListLength}
        </span>
      )}
    </Link>
  );
};

export default ListRender;
