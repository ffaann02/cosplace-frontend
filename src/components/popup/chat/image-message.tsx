import { Image } from 'antd';
import React from 'react';

interface ImageMessageProps {
    side: string;
    image: string;
}

const ImageMessage: React.FC<ImageMessageProps> = ({ side, image }) => {
    return (
        <div className='w-full h-full'>
            <div className={`flex ${side === "receiver" ? "justify-start " : "justify-end "} `}>
                <div className={`w-[60%] rounded-lg ${side === "receiver" ? "ml-2" : "mr-2"} `}>
                    <Image
                        className="object-cover w-full rounded-t-lg my-auto mx-auto"
                        src={image}
                        alt="Message with image"
                        height={150}
                        preview={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageMessage;