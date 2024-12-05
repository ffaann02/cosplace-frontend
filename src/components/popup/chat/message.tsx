import Image from "next/image";
import FlexMessage from "./flex-message";
import ImageMessage from "./image-message";

interface MessageProps {
  message: {
    text: string;
    image_url: string
    header: string;
    external_url: string;
  };
  image?: string;
  side: "sender" | "receiver"; // receiver right, sender (myself view) left
  // check side by userId <-> message.userId
  type: string//"text" | "image";
  profileImageUrl?: string;
  onClickFunction: () => void;
  isDisplayTime: boolean;
  dateTime: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  };
}

const Message: React.FC<MessageProps> = ({ message, image, side, type, onClickFunction, isDisplayTime, dateTime }) => {
  return (
    <>
      <div className="my-3 flex w-full">
        {side === "receiver" && (
          <>
            {type === "text" &&
              <div className="flex justify-start ml-2 w-full">
                <Image
                  src={"/images/sad-cat.jpg"}
                  alt="profile"
                  width={24}
                  height={24}
                  className="rounded-full h-[24px] w-[24px] mr-2"
                />
                <div
                  className={`${type === "text" &&
                    "rounded-xl rounded-tl-none bg-neutral-200 text-neutral-600"
                    } w-fit px-2 py-1 text-sm mt-0.5`}
                  onClick={() => onClickFunction()}
                >
                  {type === "text" && message && <p className="">{message.text}</p>}
                </div>
              </div>
            }
          </>
        )}
        {side === "sender" && (
          <>
            {type === "text" &&
              <div className="flex justify-end ml-auto mr-2 w-full">
                <div
                  className={`${type === "text" &&
                    "rounded-xl rounded-tr-none bg-primary-200 text-primary-800"
                    } px-2 py-1 max-w-[75%] text-sm mt-0.5`}
                  onClick={() => onClickFunction()}
                >
                  {type === "text" && message && <p>{message.text}</p>}
                </div>
              </div>
            }
          </>
        )}
      </div>
      {type === "flex" && image && (
        <FlexMessage
          side={side}
          message={message}
          image={image}
          dateTime={dateTime}
        />
      )}
      {type === "image" && image && (
        <ImageMessage
          side={side}
          image={image}
        />
      )}
      {isDisplayTime && (
        <div className={`-mt-3 text-xs ${side === "receiver" ? "text-neutral-400 text-left ml-12" : "text-primary-400 text-right mr-3"}`}>
          {dateTime.hour.toString().padStart(2, '0')}:{dateTime.minute.toString().padStart(2, '0')}
        </div>
      )}
    </>
  );
};

export default Message;
