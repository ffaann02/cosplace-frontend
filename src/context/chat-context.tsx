"use client";
import { set } from "date-fns";
import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
    useContext,
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
    };
    dateTime: Date;
    dateTimeFormatted: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
    }
}

export interface ChatListInterface {
    userId: string;
    name: string;
    profileImageUrl?: string;
    lastMessage: string;
}

interface ChatContextType {
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
    setMessages?: (messages: ChatMessage[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const ChatProvider = ({ children }: { children: ReactNode }) => {

    const [chatList, setChatList] = useState<ChatListInterface[]>([]);
    const [currentChatId, setCurrentChatId] = useState<string>("");
    const [senderId, setSenderId] = useState<string>("");
    const [senderName, setSenderName] = useState<string>("");
    const [receiverId, setReceiverId] = useState<string>("");
    const [recieverName, setRecieverName] = useState<string>("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    return (
        <ChatContext.Provider
            value={{
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
            }}>
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
}

export { ChatProvider, useChat };