import Image from "next/image";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";

export interface SearchResultCardProps {
  name: string;
  price: number;
  location: string;
  image?: string;
  createdAt?: string;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({
  name,
  price,
  location,
  image,
}) => {
  return (
    <div
      className="h-80 bg-white rounded-lg border border-primary-200 drop-shadow-sm flex flex-col
    transition-all duration-100 ease-linear hover:drop-shadow-xl cursor-pointer"
      id="search-result-card"
    >
      <Image
        className="rounded-t-lg object-cover w-full h-[60%]"
        src={image || "/images/sad-cat.jpg"}
        alt="placeholder"
        width={200}
        height={200}
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
              {location}
            </label>
          </h6>
        </div>
      </div>
    </div>
  );
};
export default SearchResultCard;
