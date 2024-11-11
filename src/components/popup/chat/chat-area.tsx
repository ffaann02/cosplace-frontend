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

const ChatArea = () => {

  const { user } = useAuth();
  const {
    currentChatId,
    senderId,
    senderName,
    receiverId,
    recieverName,
    messages,
    setMessages,
  } = useChat();

  const [inputMessage, setInputMessage] = useState("");
  const [isMessageClicked, setIsMessageClicked] = useState(false);
  const [messageClickedIndex, setMessageClickedIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function messageEvent(message: ChatMessage) {
      console.log("Received message:", message);
      const prevMessages: ChatMessage[] = messages || [];
      setMessages?.([...prevMessages, message]);
      // setMessages((prevMessages) => [...prevMessages, message]);
    }
    socket.on("message", messageEvent);

    return () => {
      socket.off("message");
    };
  }, [messages]);

  useEffect(() => {
    socket.on("history", (message: ChatMessage[]) => {
      console.log("history message:", message);
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

  const displayMessageTime = (message: ChatMessage, index: number) => {
    if (index === 0) {
      return true;
    }
    const previousMessage = (messages ?? [])[index - 1];
    if (message.dateTimeFormatted.year !== previousMessage.dateTimeFormatted.year) {
      return true;
    }
    if (message.dateTimeFormatted.month !== previousMessage.dateTimeFormatted.month) {
      return true;
    }
    if (message.dateTimeFormatted.day !== previousMessage.dateTimeFormatted.day) {
      return true;
    }
    if (message.dateTimeFormatted.hour !== previousMessage.dateTimeFormatted.hour) {
      return true;
    }
    return false;
  }

  const handleMessagesClick = (index: number) => {
    setMessageClickedIndex(index);
    setIsMessageClicked(!isMessageClicked);
  }

  function convertToThaiMonth(month: number) {
    switch (month) {
      case 1:
        return "ม.ค.";
      case 2:
        return "ก.พ.";
      case 3:
        return "มี.ค.";
      case 4:
        return "เม.ย.";
      case 5:
        return "พ.ค.";
      case 6:
        return "มิ.ย.";
      case 7:
        return "ก.ค.";
      case 8:
        return "ส.ค.";
      case 9:
        return "ก.ย.";
      case 10:
        return "ต.ค.";
      case 11:
        return "พ.ย.";
      case 12:
        return "ธ.ค.";
      default:
        return "";
    }
  }

  function formatTime(hour: number, minute: number) {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="col-span-4 flex flex-col flex-grow">
      <div className="border-b bg-primary-50 border-primary-200 px-1.5 py-1.5 drop-shadow-sm flex">
        {currentChatId !== ""
          ? (
            <>
              <Image
                src={"/images/sad-cat.jpg"}
                alt="profile"
                width={32}
                height={32}
                className="rounded-full w-[32px] h-[32px] my-auto"
              />
              <p className="text-lg my-auto ml-2 text-primary-600">{recieverName}</p></>)
          : (
            <p className="text-lg my-auto ml-2 text-primary-600">ไม่พบประวัติการแชท</p>
          )}
      </div>
      <div className="bg-white overflow-y-scroll h-[40vh] custom-scrollbar">
        {messages?.map((message, index) => (
          <>
            {displayMessageTime(message, index) && message.dateTimeFormatted && (
              <div className="text-center text-sm text-primary-400 my-2" key={index}>
                {message.dateTimeFormatted.day} {convertToThaiMonth(message.dateTimeFormatted.month)} {formatTime(message.dateTimeFormatted.hour, message.dateTimeFormatted.minute)}
              </div>
            )}
            <div ref={scrollRef}>
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
          </>
        ))}
        {currentChatId !== "" && messages?.length === 0 && (
          <p className="text-center text-primary-400 my-2">ไม่มีข้อความ</p>
        )}
      </div>
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
      )}
    </div>
  );
};
export default ChatArea;
