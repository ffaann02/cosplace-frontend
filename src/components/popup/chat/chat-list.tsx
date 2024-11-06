import Search from "antd/es/input/Search";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChatMessage, socket } from "@/api/socket";

interface ChatList {
  userId: string;
  name: string;
  profileImageUrl?: string;
  lastMessage: string;
}

const mockChatList: ChatList[] = [
  {
    userId: "1",
    name: "John Doe",
    lastMessage: "Hello",
    profileImageUrl: "https://randomuser",
  },
  {
    userId: "2",
    name: "Michael Smith",
    lastMessage: "Hi",
    profileImageUrl: "https://randomuser",
  },
  {
    userId: "3",
    name: "James Bond",
    lastMessage: "Hey",
    profileImageUrl: "https://randomuser",
  },
  {
    userId: "4",
    name: "Kevin Hart",
    lastMessage: "Hey",
    profileImageUrl: "https://randomuser",
  },
  {
    userId: "5",
    name: "George Clooney",
    lastMessage: "Hey",
    profileImageUrl: "https://randomuser",
  },
];

const ChatList = () => {

  const [chatId, setChatId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [chatWith, setChatWith] = useState<string>("");

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    // Connect socket if it's not already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    function messageEvent(message: ChatMessage) {
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    }
    socket.on("message", messageEvent);

    return () => {
      socket.off("message");
    };
  }, []);

  const openChat = (senderId: string, receiverId: string) => {
    const sortedIds = [senderId, receiverId].sort();
    const roomId = `${sortedIds[0]}-${sortedIds[1]}`;
    setChatId(roomId);
    setChatWith(receiverId);
    socket.emit('joinRoom', roomId);
  };

  return (
    <div className="col-span-2 border-r flex flex-col border-primary-200 h-full p-2 pr-0 max-h-[50vh]">
      <div className="pr-2">
        <Search placeholder="ค้นหาเพื่อน" />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 overflow-y-auto flex-grow custom-scrollbar">

        {mockChatList.map((chat) => (
          <div
            key={chat.userId}
            className="flex items-center border-primary-200"
          >
            <Image
              src={"/images/sad-cat.jpg"}
              alt="profile"
              width={24}
              height={24}
              className="rounded-full w-[24px] h-[24px] my-auto mr-3"
            />
            <div>
              <h6 className="text-primary-700 text-sm">{chat.name}</h6>
              <p className="text-primary-500 font-light text-xs">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ChatList;

