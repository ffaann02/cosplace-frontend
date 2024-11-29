"use client";
import TextArea from "antd/es/input/TextArea";
import Image from "next/image";
import { IoSend } from "react-icons/io5";
import { BsFileImage } from "react-icons/bs";
import Message from "./message";
import { ChatMessage, useChat } from "@/context/chat-context";
import { useEffect, useState, useRef } from "react";
import { socket } from "@/api/socket";
import { useAuth } from "@/context/auth-context";
import { convertToThaiMonth, displayMessageTime, formatMessageTime, getFriendListWithLastMessage } from "@/utils/chat";

const ChatArea = ({
  isOpen,
}: {
  isOpen: boolean;
}) => {

  const { user } = useAuth();
  const {
    chatList,
    currentChatId,
    receiverId,
    recieverName,
    messages,
    setMessages,
    autoScrollMessageRef,
  } = useChat();

  const [inputMessage, setInputMessage] = useState("");
  const [isMessageClicked, setIsMessageClicked] = useState(false);
  const [messageClickedIndex, setMessageClickedIndex] = useState(-1);

  useEffect(() => {
    function messageEvent(message: ChatMessage) {
      if (currentChatId !== message.chatId) return;
      // console.log("Received message:", message);
      const prevMessages: ChatMessage[] = messages || [];
      setMessages?.([...prevMessages, message]);
      getFriendListWithLastMessage(user?.user_id);
    }
    socket.on("message", messageEvent);

    return () => {
      socket.off("message");
    };
  }, [messages]);

  useEffect(() => {
    socket.on("history", (message: ChatMessage[]) => {
      setMessages?.(message);
    });
    return () => {
      socket.off("history");
    };
  }, [currentChatId]);

  const sendMessage = () => {
    const chatMessageFormat = {
      chatId: currentChatId,
      senderId: user?.user_id,
      senderName: user?.username,
      receiverId: receiverId,
      type: "text",
      message: {
        text: inputMessage,
        image_url: ""
      }
    };
    socket.emit("message", chatMessageFormat);
    setInputMessage("");
  };

  const handleMessagesClick = (index: number) => {
    setMessageClickedIndex(index);
    setIsMessageClicked(!isMessageClicked);
  }

  useEffect(() => {
    autoScrollMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentChatId, isOpen]);

  return (
    <div className="col-span-4 flex flex-col flex-grow">
      {/* Show empty chat area */}
      {currentChatId === "" && (
        <div className="h-[50vh] bg-primary-50">
          <div className="relative w-full h-full">
            <div className="absolute w-full h-full flex justify-center items-center">
              <div className=" animate-headShake">
                <Image
                  src={"https://cpe334-cosplace-bucket.s3.ap-southeast-1.amazonaws.com/mascot/tanuki_select_chat.png"}
                  alt="mascot"
                  width={128}
                  height={128}
                  className="m-auto"
                />
                <p className=" text-primary-800">เลือกผู้ใช้ที่คุณต้องการสนทนาด้วย</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentChatId !== "" && (
        <div className="border-b bg-primary-50 border-primary-200 px-1.5 py-1.5 drop-shadow-sm flex">
          <Image
            src={"/images/sad-cat.jpg"}
            alt="profile"
            width={32}
            height={32}
            className="rounded-full w-[32px] h-[32px] my-auto"
          />
          <p className="text-lg my-auto ml-2 text-primary-600">{recieverName}</p>
        </div>
      )}
      {currentChatId !== "" && (
        <div className="bg-white overflow-y-scroll h-[40vh] custom-scrollbar">
          {messages?.map((message, index) => (
            <div key={index}>
              {displayMessageTime(messages, message, index) && message.dateTimeFormatted && (
                <div className="text-center text-sm text-primary-400 my-2" key={index}>
                  {message.dateTimeFormatted.day} {convertToThaiMonth(message.dateTimeFormatted.month)} {formatMessageTime(message.dateTimeFormatted.hour, message.dateTimeFormatted.minute)}
                </div>
              )}
              <div ref={autoScrollMessageRef}>
                <Message
                  key={message.messageId}
                  message={message.message.text}
                  side={message.senderId === user?.user_id ? "sender" : "receiver"}
                  type="text"
                  profileImageUrl="/images/sad-cat.jpg"
                  onClickFunction={() => handleMessagesClick(index)}
                  isDisplayTime={isMessageClicked && messageClickedIndex === index}
                  dateTime={message.dateTimeFormatted}
                />
              </div>
            </div>
          ))}
          {messages?.length === 0 && (
            <p className="text-center text-primary-400 my-2">ไม่มีข้อความ</p>
          )}
        </div>
      )}
      {currentChatId !== "" && (
        <div className="border-primary-200 bg-primary-50 p-2 h-[10%]">
          <div className="flex gap-x-1">
            <button className="text-primary-400 hover:text-primary-600 hover:bg-primary-100 rounded-lg p-2 h-fit">
              <BsFileImage className="text-xl" />
            </button>
            <TextArea
              placeholder="ส่งข้อความ"
              autoSize
              style={{ marginTop: 2 }}
              onChange={(e) => setInputMessage(e.target.value)}
              value={inputMessage}
            />
            <button className="text-primary-400 hover:text-primary-600 hover:bg-primary-100 rounded-full p-2 h-fit" onClick={() => sendMessage()}>
              <IoSend className="text-xl" />
            </button>
          </div>
        </div>
      )
      }
    </div >
  );
};
export default ChatArea;
