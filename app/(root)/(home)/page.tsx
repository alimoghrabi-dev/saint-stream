import DiscoverHome from "@/components/DiscoverHome";
import FetchCategories from "@/components/FetchCategories";
import Hero from "@/components/Hero";
import NowPlaying from "@/components/NowPlaying";
import Popular from "@/components/Popular";
import TopRated from "@/components/TopRated";
import UpComing from "@/components/UpComing";

export default function Home() {
  return (
    <main className="relative pb-5">
      <div className="bg-gradient-to-b h-[160px] from-black opacity-[0.90067] z-[49] to-transparent absolute top-0 left-0 right-0" />
      <Hero />
      <div className="w-full flex flex-wrap items-center justify-center gap-x-3 lg:gap-x-8 px-5 md:px-8 lg:px-12 pb-5 pt-6">
        <FetchCategories />
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
