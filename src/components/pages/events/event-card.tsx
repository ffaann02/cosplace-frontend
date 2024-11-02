import { divider } from "@/config/theme";
import { eventCardDateFormat } from "@/utils/dateformat";
import { Divider } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoLocation, IoLocationOutline } from "react-icons/io5";

interface EventCardProps {
  start_date: string;
  end_date: string;
  name: string;
  location: string;
  image_cover?: string;
  mobile?: boolean
}

const EventCard: React.FC<EventCardProps> = ({
  start_date,
  end_date,
  name,
  location,
  image_cover,
  mobile
}) => {
  return (
    <Link href="/events/" className={mobile ? "px-2":""}>
      <div
        className="bg-white drop-shadow-sm flex flex-col h-[360px] border hover:border-opacity-100 
    border-primary-200 border-opacity-50 rounded transition-all ease-linear duration-150"
    id="search-result-card"
      >
        <Image
          className="object-cover w-full h-[200px] rounded-t"
          src={image_cover || "/images/sad-cat.jpg"}
          alt="placeholder"
          width={200}
          height={200}
        />
        <div className="pl-2 pt-2 pb-1.5 flex-grow flex flex-col">
          <h6 className="text-primary-600 font-light text-xs xl:text-sm bg-primary-100 w-fit px-2 py-0.5 rounded-lg">
            {eventCardDateFormat(start_date, end_date)}
          </h6>
          <h4 className="text-primary-700 font-light ml-0.5">{name}</h4>
          <div className="mt-auto mb-0">
            <Divider
              className="bg-secondary-100 col-span-full"
              style={divider}
            />
            <div className="flex mt-1">
              <IoLocationOutline className="my-auto mr-1 text-primary-800 text-sm" />
              <h6 className="text-sm text-primary-500 font-light">
                {location}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default EventCard;