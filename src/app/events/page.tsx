"use client";
import { useRouter } from "next/navigation";
import EventCard from "@/components/pages/events/event-card";
import { MdDateRange } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import eventList from "@/data/mock/event-list.json";
import { BsCalendar2Event } from "react-icons/bs";
import { CalendarOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

const Events = () => {
  const router = useRouter();

  const handleEventClick = (eventName: string) => {
    router.push(`/events/${encodeURIComponent(eventName)}`);
  };

  return (
    <div className="flex-grow min-h-screen">
      <div className="bg-gradient-to-t from-primary-100 to-primary-200 w-full px-4 pt-6 pb-3">
        <div className="w-full lg:max-w-6xl mx-auto px-4 justify-between flex relative h-full flex-grow">
          <div className="text-primary-700 my-auto">
            <div className="flex">
              <CalendarOutlined className="text-3xl mr-3" />
              <h3 className="text-3xl text-primary-800">กิจกรรมคอสเพลย์</h3>
            </div>
            <div className="mt-2">
              <Breadcrumb
                items={[
                  {
                    href: "/",
                    title: (
                      <>
                        <HomeOutlined />
                        <span>หน้าหลัก</span>
                      </>
                    ),
                  },
                  {
                    title: (
                      <div className="flex">
                        <BsCalendar2Event className="my-auto mr-2" />
                        <span className="my-auto">กิจกรรมคอสเพลย์</span>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 max-w-6xl w-full mx-auto px-4">
        <div className="flex mb-4">
          <MdDateRange className="text-2xl text-primary-600 my-auto mr-2" />
          <h4 className="text-primary-600">กำลังจะมาถึง</h4>
        </div>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
        gap-x-4 gap-y-4 2xl:gap-x-4 2xl:gap-y-4"
        >
          {eventList.map((event, index) => (
            <div
              key={index}
              onClick={() => handleEventClick(event.name)}
              className="cursor-pointer"
            >
              <EventCard
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

export default Events;
