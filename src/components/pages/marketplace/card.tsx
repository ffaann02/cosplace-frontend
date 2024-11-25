import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";

export interface SearchResultCardProps {
  name: string;
  price: number;
  region: string;
  image?: string;
  createdAt?: string;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({
  name,
  price,
  region,
  image,
}) => {

  const router = useRouter();
  const handleNavigate = (product_name:string) => {
    router.push(`/marketplace/product/${product_name}`);
  };

  return (
    <div
      className="h-80 bg-white rounded-lg border border-primary-200 drop-shadow-sm flex flex-col
    transition-all duration-100 ease-linear hover:drop-shadow-xl cursor-pointer"
      id="search-result-card"
      onClick={handleNavigate.bind(this, name)}
    >
      <Image
        className="object-cover rounded-t-lg w-full h-[60%]"
        src={image || "/images/sad-cat.jpg"}
        alt="placeholder"
        width={200}
        height={200}
        unoptimized
      />
      <div className="pl-2.5 py-2 relative flex-grow flex flex-col">
        <h5 className="font-light text-primary-700 text-xl">{name}</h5>
        <div className="mt-auto">
          <h6 className=" bg-primary-100 text-primary-600 px-2 py-1 rounded-lg w-fit mb-2">
            ฿ {price}
          </h6>
          <h6 className="flex">
            <IoLocationOutline className="my-auto mr-1 text-primary-800 text-sm" />
            <label className="text-xs text-primary-500 my-auto">
              {region}
            </label>
          </h6>
        </div>
      </div>
    </div>
  );
};
export default SearchResultCard;
