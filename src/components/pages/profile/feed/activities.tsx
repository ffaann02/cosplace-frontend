import React from "react";
import EventCard from "../../events/event-card";
import eventList from "@/data/mock/event-list.json";

const FeedActivities = () => {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
        gap-x-4 gap-y-4 2xl:gap-x-6 2xl:gap-y-6 px-4 xl:px-0 mt-4"
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
  );
};

export default FeedActivities;
