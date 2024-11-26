import { eventCardDateFormat } from '@/utils/dateformat';
import React from 'react';


interface EventDetailsProps {
    name: string;
    location: string;
    startDate: string;
    endDate: string;
    imageCover: string;
}

const EventDetails: React.FC<EventDetailsProps> = ({ name, location, startDate, endDate, imageCover }) => {
    return (
        <div className="mt-4 px-6 py-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
            {/* Image */}
            <div className="w-full lg:w-[40%] flex flex-col items-center">
                <img
                    src={imageCover}
                    alt={name}
                    className="w-full h-auto max-h-80 object-contain rounded-md shadow-md mb-4"
                />
                <div className="text-center mt-2">
                    <p className="text-black font-medium">
                        📅 {eventCardDateFormat(startDate, endDate)}
                    </p>
                    <p className="text-black font-medium mt-1">📍 {location}</p>
                </div>
            </div>

            {/* Details */}
            <div className="mt-6 lg:mt-0 lg:ml-12 flex-grow max-w-2xl">
                <h1 className="text-3xl font-bold text-primary-800">{name}</h1>

                <div className="mt-4">
                    <h2 className="text-xl font-bold text-primary-600">📝 รายละเอียดงาน</h2>
                    <p className="text-secondary-600 mt-2 leading-relaxed">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea aliquid voluptate ex
                        consectetur quos, atque voluptas debitis iste voluptatibus quidem quo odit ullam at vel
                        odio exercitationem necessitatibus dolore. Itaque!
                    </p>
                </div>

                <div className='mt-6'>
                    <h2 className="text-xl font-bold text-primary-600">🔎 รายละเอียดเพิ่มเติม</h2>
                    <p className="text-secondary-600 mt-2 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima amet dignissimos quia
                        sunt sapiente necessitatibus pariatur voluptates molestias mollitia? Voluptatem
                        temporibus dolorem, minus blanditiis adipisci veniam reiciendis ipsam voluptate?
                        Corrupti.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
