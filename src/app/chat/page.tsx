"use client";
import { ChatMessage, socket } from "@/api/socket";
import { useEffect, useState } from "react";

const Chat = () => {
    const [chatId, setChatId] = useState("");
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [chatWith, setChatWith] = useState("");

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");

    const userList = [
        { userId: "u001", username: "Pathipan" },
        { userId: "u002", username: "John" },
        { userId: "u003", username: "Michael" },
        { userId: "u004", username: "Rachel" },
    ];

    const chatList = [
        { userId: "u001", username: "Pathipan" },
        { userId: "u002", username: "John" },
        { userId: "u003", username: "Michael" },
        { userId: "u004", username: "Rachel" },
    ]

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

    const sendMessage = () => {
        console.log(`${userId} Sending message: `, input);
        socket.emit("message", { chatId, username, userId, text: input });
        setInput("");
    };

    const selectUser = (userId: string) => {
        setUserId(userId);
        const username = userList.find((user) => user.userId === userId)?.username;
        setUsername(username);
    };

    const openChat = (senderId: string, receiverId: string) => {
        const sortedIds = [senderId, receiverId].sort();
        const roomId = `${sortedIds[0]}-${sortedIds[1]}`;
        setChatId(roomId);
        setChatWith(receiverId);
        socket.emit('joinRoom', roomId);
    };

    return (
        <div>
            <div className="m-4 flex gap-2">
                {userList.map((user, index) => (
                    <div key={index} className={`p-1 ${user.userId == userId ? "bg-red-400" : "bg-red-200"} `}>
                        <button onClick={() => selectUser(user.userId)}>
                            {user.userId}:{user.username}
                        </button>
                    </div>
                ))}
            </div>
            <p className="ml-4">You are {userId || "..."}</p>
            <div className="m-4">
                {userId && chatList.map((chat, index) => {
                    if (chat.userId !== userId)
                        return (
                            <div key={index} className={`p-1 ${chat.userId == chatWith ? "bg-red-400" : "bg-red-200"} `}>
                                <button onClick={() => openChat(userId, chat.userId)}>
                                    Chat with {chat.userId}:{chat.username}
                                </button>
                            </div>
                        )
                })}
            </div>
            <p className="ml-4">Chat with {chatWith || "..."}</p>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <p className="text-xs">{message.dateTime.hour}: {message.dateTime.minute}</p>
                        <strong>{message.username}</strong>: {message.text}
                    </div>
                ))}
            </div>

            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
