import { notFound, useRouter } from "next/navigation";
import EventDetails from "../../../components/pages/events/event-details";
import eventList from "@/data/mock/event-list.json";
import { Breadcrumb } from "antd";
import {
  CalendarOutlined,
  HomeOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { TbActivity } from "react-icons/tb";
import { IoListOutline } from "react-icons/io5";
import { BsCalendar2Event } from "react-icons/bs";
import EventCard from "@/components/pages/events/event-card";

interface EventPageProps {
  params: {
    eventsname: string;
  };
}

const EventPage = ({ params }: EventPageProps) => {
  const { eventsname } = params;

  const event = eventList.find(
    (e) => e.name.toLowerCase() === decodeURIComponent(eventsname).toLowerCase()
  );

  if (!event) {
    notFound();
    return null;
  }

  return (
    <div>
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
                    href: "/events",
                    title: (
                      <div className="flex">
                        <BsCalendar2Event className="my-auto mr-2" />
                        <span className="my-auto">กิจกรรมคอสเพลย์</span>
                      </div>
                    ),
                  },
                  {
                    title: (
                      <>
                        <CalendarOutlined />
                        <span>{decodeURIComponent(eventsname)}</span>
                      </>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <EventDetails
        name={event.name}
        location={event.location}
        startDate={event.start_date}
        endDate={event.end_date}
        imageCover={event.image_cover}
        details={event.details}
        remark={event.remark}
      />
    </div>
  );
};

export default EventPage;
