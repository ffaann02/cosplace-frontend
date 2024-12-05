import { io } from 'socket.io-client';

// const URL = process.env.NEXT_PUBLIC_APP_STATUS === "PRODUCTION" ? "https://cosplace-socket-server.onrender.com" : "http://localhost:3600";
const URL = "https://cosplace-socket-server.onrender.com"

export const socket = io(URL, {
    path: "/socket.io", 
    withCredentials: true,
    autoConnect: false,
});