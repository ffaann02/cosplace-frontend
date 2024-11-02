import Image from "next/image";

interface MessageProps {
  message?: string;
  image?: string;
  side: "sender" | "receiver"; // receiver right, sender (myself view) left
  // check side by userId <-> message.userId
  type: "text" | "image";
  profileImageUrl?: string;
}

const Message: React.FC<MessageProps> = ({ message, image, side, type }) => {
  return (
    <div className="my-3 flex w-full">
      {side === "receiver" && (
        <div className="flex justify-start ml-2">
          <Image
            src={"/images/sad-cat.jpg"}
            alt="profile"
            width={24}
            height={24}
            className="rounded-full h-[24px] w-[24px] mr-2"
          />
          <div
            className={`${
              type === "text" &&
              "rounded-xl rounded-tl-none bg-neutral-200 text-neutral-600"
            } w-fit px-2 py-1 max-w-[75%] text-sm mt-0.5`}
          >
            {type === "text" && message && <p>{message}</p>}
            {type === "image" && image && (
              <img src={image} alt="message content" />
            )}
          </div>
        </div>
      )}
      {side === "sender" && (
        <div className="flex justify-end ml-auto mr-2">
          <div
            className={`${
              type === "text" &&
              "rounded-xl rounded-tr-none bg-primary-200 text-primary-800"
            } w-fit px-2 py-1 max-w-[75%] text-sm mt-0.5`}
          >
            {type === "text" && message && <p>{message}</p>}
            {type === "image" && image && (
              <img src={image} alt="message content" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
