import DiscoverHome from "@/components/DiscoverHome";
import Hero from "@/components/Hero";
import NowPlaying from "@/components/NowPlaying";
import Popular from "@/components/Popular";
import TopRated from "@/components/TopRated";
import UpComing from "@/components/UpComing";
import LinksComponents from "@/components/shared/LinksComponents";
import { navLinks } from "@/constants";

export default function Home() {
  return (
    <main className="relative pb-5">
      <div className="bg-gradient-to-b h-[160px] from-black opacity-[0.90067] z-[49] to-transparent absolute top-0 left-0 right-0" />
      <Hero />
      <div className="w-full flex justify-center items-center py-8 relative">
        <div className="border-gray-400 z-10 border-2 rounded-2xl bg-slate-700/20 px-3 py-2 sm:py-3 sm:px-4 flex flex-wrap mx-2 items-center justify-center gap-2">
          <LinksComponents
            navLinks={navLinks}
            className="capitalize text-sm sm:text-base"
          />
        </div>
        <div className="bg-gradient-to-b h-full from-black opacity-[0.34067] z-0 to-transparent absolute top-0 left-0 right-0" />
      </div>
      <div className="space-y-5">
        <UpComing />
        <DiscoverHome />
        <TopRated />
        <Popular />
        <NowPlaying />
      </div>
    </main>
  );
}
