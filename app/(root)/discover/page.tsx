import DiscoverHero from "@/components/DiscoverHero";
import FetchCategories from "@/components/FetchCategories";
import UpComing from "@/components/UpComing";

const Page = () => {
  return (
    <section className="relative pb-5">
      <div className="bg-gradient-to-b h-[160px] from-black opacity-[0.90067] z-[49] to-transparent absolute top-0 left-0 right-0" />
      <DiscoverHero />
      <div className="w-full flex flex-wrap items-center justify-center gap-x-3 lg:gap-x-8 px-5 md:px-8 lg:px-12 pb-5 pt-6">
        <FetchCategories />
      </div>
      <div className="space-y-5">
        <UpComing />
      </div>
    </section>
  );
};

export default Page;
