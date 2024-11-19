"use client";
import Search from "antd/es/input/Search";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { socket } from "@/api/socket";
import { useAuth } from "@/context/auth-context";
import { ChatListInterface, ChatMessage, useChat } from "@/context/chat-context";
import { NotificationInterface, useNotification } from "@/context/notification-context";
import { getFriendListWithLastMessage } from "@/utils/chat";

const ChatList = ({
  isOpen,
}: {
  isOpen: boolean;
}) => {

  const { user } = useAuth();

  const {
    chatList,
    setChatList,
    currentChatId,
    setCurrentChatId,
    setReceiverId,
    setRecieverName,
  } = useChat();
  const {
    notifications,
    setNotifications,
  } = useNotification();

  // Call function to get friend list with last message using socket emit
  useEffect(() => {
    if (!isOpen) {
      setCurrentChatId("");
    }
    socket.connect();
    getFriendListWithLastMessage(user?.user_id);
    return () => {
      socket.disconnect();
    };
  }, [isOpen]);

  // Listen for response friend list
  useEffect(() => {
    function friendListEvent(friendList: ChatListInterface[]) {
      setChatList(friendList);
    }
    socket.on("friendList", friendListEvent);

    return () => {
      socket.off("friendList");
    };
  }, []);

  // Select the first chat in the list by default
  // But not when chatlist is updated (Sort by new message)
  useEffect(() => {
    if (chatList.length > 0 && user?.user_id && currentChatId === "") {
      selectChat(user.user_id, chatList[0].userId);
    }
  }, [chatList]);

  useEffect(() => {
    function notificationEvent(notiData: NotificationInterface) {
      getFriendListWithLastMessage((user?.user_id));
      const newNotification: NotificationInterface = {
        notification_id: notiData.notification_id,
        send_from: notiData.send_from,
        send_to: notiData.send_to,
        type: notiData.type,
        sender_id: notiData.sender_id,
        message: notiData.message,
        is_read: false,
        date_time: new Date(),
        date_time_formatted: {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1, // Adjust for 0-indexed month
          day: new Date().getDate(),
          hour: new Date().getHours(),
          minute: new Date().getMinutes(),
          second: new Date().getSeconds(),
        },
      };
      addNewNotification(newNotification);
    }

    socket.on("notification", notificationEvent);

    return () => {
      socket.off("notification", notificationEvent);
    };
  }, [setNotifications, socket]);

  const selectChat = (senderId: string, receiverId: string) => {
    const sortedIds = [senderId, receiverId].sort();
    const roomId = `${sortedIds[0]}-${sortedIds[1]}`;
    setCurrentChatId(roomId);
    setReceiverId(receiverId);
    setRecieverName(chatList.find((chat) => chat.userId === receiverId)?.name || "");
    markAsRead(receiverId);
    const data = {
      chatId: roomId,
      userId: user?.user_id
    }
    socket.emit('joinRoom', data);
  }

  const checkUnreadMessage = (currentChatUserId: string) => {
    return notifications?.filter((notification) => notification.sender_id === currentChatUserId && !notification.is_read && notification.reciever_id !== user?.user_id && !currentChatId.includes(currentChatUserId)).length > 0.;
  }

  const countUnreadMessage = (currentChatUserId: string) => {
    return notifications?.filter((notification) => notification.sender_id === currentChatUserId && !notification.is_read && notification.reciever_id !== user?.user_id && !currentChatId.includes(currentChatUserId)).length;
  }

  const markAsRead = (currentChatUserId: string) => {
    const updatedNotifications = notifications?.map((notification) => {
      if (notification.sender_id === currentChatUserId) {
        return {
          ...notification,
          is_read: true
        }
      }
      return notification;
    })
    setNotifications(updatedNotifications);
  }

  const addNewNotification = (newNotification: NotificationInterface) => {
    setNotifications((prevNotifications: NotificationInterface[]) => {
      const updatedNotifications: NotificationInterface[] = [
        ...prevNotifications,
        newNotification,
      ];
      return updatedNotifications;
    });
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
              <div className="flex">
                <p className="text-primary-500 font-light text-xs">{chat.lastMessage}</p>
                {notifications && notifications.length > 0 && checkUnreadMessage(chat.userId) && (
                  <div className="bg-primary-400 text-white text-xs rounded-full w-4 h-4 flex justify-center items-center ml-2">
                    {countUnreadMessage(chat.userId)}
                  </div>
                )}
              </div>
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

