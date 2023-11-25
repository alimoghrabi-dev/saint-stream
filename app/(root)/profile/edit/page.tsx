import EditProfile from "@/components/EditProfile";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

const page = async () => {
  const { userId: clerkId } = auth();
  if (!clerkId) return null;

  const mongoUser = await getUserById({ clerkId });

  return (
    <>
      <section>
        <div className="relative h-[75vh] w-full">
          <div className="bg-gradient-to-b h-[160px] from-black opacity-[0.90067] z-[49] to-transparent absolute top-0 left-0 right-0" />
          <Image
            src={"/images/background-profile.png"}
            alt="movie"
            fill
            className="h-[75vh] w-full object-cover object-center z-40"
          />

          <div className="bg-gradient-to-t h-[175px] from-black opacity-[1] z-[49] to-transparent absolute bottom-0 left-0 right-0" />
          <div className="absolute bottom-9 left-5 sm:left-12 flex flex-col gap-4 items-start z-50 text-shadow">
            <h3 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold capitalize">
              become a movie <br /> influencer
            </h3>
            <p className="text-gray-300 text-sm sm:text-base font-normal max-w-[250px] sm:max-w-lg">
              Share your tough about movie to people and become influencer.
            </p>
          </div>
        </div>

        <EditProfile user={mongoUser?.user} />
      </section>
    </>
  );
};

export default page;
