"use client";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useRef,
} from "react";

export interface ChatMessage {
  messageId: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  type: string; // 'text' or 'image'
  message: {
    text: string;
    image_url: string;
    header: string;
    external_url: string;
  };
  dateTime: Date;
  dateTimeFormatted: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  };
}

export interface ChatListInterface {
  userId: string;
  username: string;
  name: string;
  profileImageUrl?: string;
  lastMessage: string;
  senderId: string;
}

interface ChatContextType {
  partnerUsername: string;
  setPartnerUsername: React.Dispatch<React.SetStateAction<string>>;
  isOpenWithUsername: boolean;
  setIsOpenWithUsername: React.Dispatch<React.SetStateAction<boolean>>;
  openChatbox: boolean;
  setOpenChatbox: React.Dispatch<React.SetStateAction<boolean>>;
  chatList: ChatListInterface[];
  setChatList: (chatList: ChatListInterface[]) => void;
  currentChatId: string;
  setCurrentChatId: (chatId: string) => void;
  senderId: string;
  setSenderId: (senderId: string) => void;
  senderName: string;
  setSenderName: (senderName: string) => void;
  receiverId: string;
  setReceiverId: (receiverId: string) => void;
  recieverName: string;
  setRecieverName: (recieverName: string) => void;
  messages?: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
  autoScrollMessageRef: React.RefObject<HTMLDivElement>;
  currentProfileImageUrl: string;
  setCurrentProfileImageUrl: React.Dispatch<React.SetStateAction<string>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const ChatProvider = ({ children }: { children: ReactNode }) => {
  // To control the chatbox outside component itself
  const [partnerUsername, setPartnerUsername] = useState<string>("");
  const [isOpenWithUsername, setIsOpenWithUsername] = useState<boolean>(false);
  const [openChatbox, setOpenChatbox] = useState<boolean>(false);

  const [chatList, setChatList] = useState<ChatListInterface[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string>("");
  const [senderId, setSenderId] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");
  const [receiverId, setReceiverId] = useState<string>("");
  const [recieverName, setRecieverName] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const autoScrollMessageRef = useRef<HTMLDivElement>(null);
  const [currentProfileImageUrl, setCurrentProfileImageUrl] =
    useState<string>("");

  return (
    <ChatContext.Provider
      value={{
        partnerUsername,
        setPartnerUsername,
        isOpenWithUsername,
        setIsOpenWithUsername,
        openChatbox,
        setOpenChatbox,
        chatList,
        setChatList,
        currentChatId,
        setCurrentChatId,
        senderId,
        setSenderId,
        senderName,
        setSenderName,
        receiverId,
        setReceiverId,
        recieverName,
        setRecieverName,
        messages,
        setMessages,
        autoScrollMessageRef,
        currentProfileImageUrl,
        setCurrentProfileImageUrl,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export { ChatProvider, useChat };
