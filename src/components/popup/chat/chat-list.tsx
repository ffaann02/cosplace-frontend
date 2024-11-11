import Search from "antd/es/input/Search";
import Image from "next/image";
import { useState, useEffect } from "react";
import { socket } from "@/api/socket";
import { useAuth } from "@/context/auth-context";
import { ChatListInterface, useChat } from "@/context/chat-context";

const ChatList = ({
  isOpen,
}: {
  isOpen: boolean;
}) => {

  const { user } = useAuth();
  const {
    chatList,
    setChatList,
    setCurrentChatId,
    setReceiverId,
    setRecieverName,
  } = useChat();

  useEffect(() => {
    if(!isOpen) return;
    socket.connect();
    getFriendListWithLastMessage();

    return () => {
      socket.disconnect();
    };
  }, [isOpen]);

  useEffect(() => {
    function friendListEvent(friendList: ChatListInterface[]) {
      setChatList(friendList);
    }
    socket.on("friendList", friendListEvent);

    return () => {
      socket.off("friendList");
    };
  }, []);

  useEffect(() => {
    if (chatList.length > 0 && user?.user_id) {
      selectChat(user.user_id, chatList[0].userId);
    }
  }, [chatList]);

  const getFriendListWithLastMessage = () => {
    socket.emit('openChatBox', user?.user_id);
  }

  const selectChat = (senderId: string, receiverId: string) => {
    const sortedIds = [senderId, receiverId].sort();
    const roomId = `${sortedIds[0]}-${sortedIds[1]}`;
    console.log(`${senderId} Opening chat with, ${receiverId} in room ${roomId}`);
    setCurrentChatId(roomId);
    setReceiverId(receiverId);
    setRecieverName(chatList.find((chat) => chat.userId === receiverId)?.name || "");
    socket.emit('joinRoom', roomId);
  }

  return (
    <div className="col-span-2 border-r flex flex-col border-primary-200 h-full p-2 pr-0 max-h-[50vh]">
      <div className="pr-2">
        <Search placeholder="ค้นหาเพื่อน" />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 overflow-y-auto flex-grow custom-scrollbar">
        {chatList?.map((chat) => (
          <div
            key={chat.userId}
            className="flex items-center border-primary-200 cursor-pointer hover:bg-primary-100"
            onClick={() => user?.user_id && selectChat(user.user_id, chat.userId)}
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
        {chatList.length === 0 && (
          <div>
            <p className="text-center text-sm text-primary-400 my-2">ไม่มีพบรายชื่อเพื่อน</p>
            <p className="text-center text-xs text-primary-400 my-2">กรุณาเพิ่มเพื่อนก่อนเริ่มแชท</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ChatList;

