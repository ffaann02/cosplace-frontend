"use client";
import { eventCardDateFormat } from "@/utils/dateformat";
import { LinkOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Image from "next/image";
import React from "react";
import { FaHandPointDown } from "react-icons/fa";
import EventCard from "./event-card";
import eventList from "@/data/mock/event-list.json";
import { useRouter } from "next/navigation";

interface EventDetailsProps {
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  imageCover: string;
  details: string;
  remark: string;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  name,
  location,
  startDate,
  endDate,
  imageCover,
  details,
  remark,
}) => {
  const router = useRouter();

  // Filter out the current event and shuffle the remaining events
  const filteredEvents = eventList.filter((event) => event.name !== name);
  const shuffledEvents = filteredEvents.sort(() => 0.5 - Math.random());
  const recommendedEvents = shuffledEvents.slice(0, 5);

  const handleEventClick = (eventName: string) => {
    router.push(`/events/${encodeURIComponent(eventName)}`);
  };

  return (
    <div>
      <div className="mt-4 px-6 py-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start lg:justify-between text-primary-600">
        {/* Image */}
        <div className="w-full lg:w-[40%] flex flex-col items-center">
          <Image
            src={imageCover}
            alt={name}
            className="w-full h-[400px] object-contain rounded-lg shadow-sm border border-primary-100 mb-4"
            unoptimized
            width={400}
            height={400}
          />
          <div className="text-center mt-2">
            <p className="text-primary-700 font-medium">
              📅 {eventCardDateFormat(startDate, endDate)}
            </p>
            <p className="text-primary-700 font-medium mt-1">📍 {location}</p>
          </div>
        </div>

        {/* Details */}
        <div className="mt-6 lg:mt-0 lg:ml-12 flex-grow max-w-2xl">
          <h1 className="text-3xl font-bold text-primary-800">{name}</h1>

          <div className="mt-4">
            <h2 className="text-xl font-bold text-primary-600">
              📝 รายละเอียดงาน
            </h2>
            <p className="text-secondary-600 mt-2 leading-relaxed">{details}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold text-primary-600">
              🔎 รายละเอียดเพิ่มเติม
            </h2>
            <p className="text-secondary-600 mt-2 leading-relaxed">{remark}</p>
          </div>
          <div className="bg-primary-50 w-full border border-primary-200 rounded-lg px-4 py-3 mt-8 gap-x-2 flex">
            <Button size="large" icon={<FaHandPointDown />}>
              สนใจเข้าร่วมงาน
            </Button>
            <Button size="large" icon={<LinkOutlined />} type="dashed">
              ลิงก์
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-5">
        <h4 className="text-primary-700 mb-4">
          กิจกรรมคอสเพลย์อื่นที่คุณอาจชอบ
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recommendedEvents.map((event, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => handleEventClick(event.name)}
            >
              <EventCard
                navigate={false}
                name={event.name}
                location={event.location}
                start_date={event.start_date}
                end_date={event.end_date}
                image_cover={event.image_cover}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
