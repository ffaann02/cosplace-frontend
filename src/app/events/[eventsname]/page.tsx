import { notFound } from "next/navigation";
import EventDetails from "../../../components/pages/events/event-details";
import eventList from "@/data/mock/event-list.json";

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
    <EventDetails
      name={event.name}
      location={event.location}
      startDate={event.start_date}
      endDate={event.end_date}
      imageCover={event.image_cover}
    />
  );
};

export default EventPage;
