import EventCard from "@/components/pages/events/event-card";
import { divider } from "@/config/theme";
import { Button, Divider } from "antd";
import { MdDateRange } from "react-icons/md";
import eventList from "@/data/mock/event-list.json";
import { FaChevronRight } from "react-icons/fa";

const Events = () => {
  return (
    <div className="mt-8 lg:mt-12 flex-grow min-h-screen">
      <div className="w-full lg:max-w-[80rem] 2xl:max-w-[86rem] section-container px-6 flex-grow relative">
        <div className="mb-8">
          <div className="flex w-full justify-between">
            <h2 className="text-2xl lg:text-3xl text-primary-800">งานคอสเพลย์ในไทย</h2>
            <p className="flex cursor-pointer hover:underline">
              <label className="text-primary-600 my-auto mr-1 cursor-pointer">ดูทั้งหมด</label>
              <FaChevronRight className="text-primary-500 text-xl my-auto" />
            </p>
          </div>
          <Divider className="bg-secondary-100 col-span-full" style={divider} />
        </div>
        <div className="flex mb-4">
          <MdDateRange className="text-2xl text-primary-600 my-auto mr-2" />
          <h4 className="text-primary-600">กำลังจะมาถึง</h4>
        </div>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
        gap-x-4 gap-y-4 2xl:gap-x-6 2xl:gap-y-6 "
        >
          {eventList.map((event, index) => (
            <EventCard
              key={index}
              name={event.name}
              location={event.location}
              start_date={event.start_date}
              end_date={event.end_date}
              image_cover={event.image_cover}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Events;
