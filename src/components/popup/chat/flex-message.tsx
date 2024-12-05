import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoOpenOutline } from "react-icons/io5";

const FlexMessage = ({
    side,
    message,
    image,
    dateTime,
}: {
    side: string;
    message: {
        text: string;
        image_url: string
        header: string;
        external_url: string;
    };
    image: string;
    dateTime: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
    };
}) => {

    const router = useRouter();

    const convertToThaiMonth = (month: number) => {
        const monthArray = [
            "มกราคม",
            "กุมภาพันธ์",
            "มีนาคม",
            "เมษายน",
            "พฤษภาคม",
            "มิถุนายน",
            "กรกฎาคม",
            "สิงหาคม",
            "กันยายน",
            "ตุลาคม",
            "พฤศจิกายน",
            "ธันวาคม",
        ];
        return monthArray[month - 1];
    }

    const handleNavigateButton = () => {
        router.push("/");
    }

    // Flex message => message with image
    // Flex message + icon => link to source (absolute)
    // Image

    return (
        <div className='w-full h-full'>
            <div className={`flex ${side === "receiver" ? "justify-start " : "justify-end "} `}>
                <div className={`relative w-[60%] rounded-lg ${side === "receiver" ? "ml-2 bg-neutral-100 text-neutral-600" : "mr-2 bg-primary-50 text-primary-800"} `}>
                    {/* External link button */}
                    {message.external_url && (
                        <div className='absolute w-full h-full z-10'>
                            <div className='top-2 right-2'>
                                <button className='bg-white' onClick={handleNavigateButton}>
                                    <IoOpenOutline className='text-primary-800 text-lg' />
                                </button>
                            </div>
                        </div>
                    )}
                    <Image
                        className="object-cover w-full rounded-t-lg my-auto mx-auto"
                        src={image}
                        alt="Message with image"
                        width={200}
                        height={200}
                        unoptimized={true}
                    />
                    <div className='mx-2 mt-2'>
                        {/* Header */}
                        {message.header && <h3 className="text-left text-sm font-medium">{message.header}</h3>}
                        {/* Text */}
                        {message.text && <h3 className="text-left text-xs">{message.text}</h3>}
                        {/* Date Time */}
                        <div className={`border-t mt-1 ${side === "receiver" ? "border-neutral-400" : "border-primary-400"}`}></div>
                        <div className="text-left text-xs my-2 font-thin">
                            {dateTime.day} {convertToThaiMonth(dateTime.month)} {dateTime.hour}:{dateTime.minute}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlexMessage