import { platfroms } from "@/constants";
import Image from "next/image";

const FetchCategories = () => {
  return (
    <>
      {platfroms.map((platform) => (
        <Image
          key={platform.id}
          src={platform.image}
          alt={platform.id}
          width={950}
          height={940}
          className="w-[130px] lg:w-[170px] h-[100px] lg:h-[140px] object-contain rounded-md"
        />
      ))}
    </>
  );
};

export default FetchCategories;
