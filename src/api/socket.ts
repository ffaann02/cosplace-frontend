import { io } from 'socket.io-client';

export interface ChatMessage {
    chatId: string;
    userId: string;
    username: string;
    text: string;
    dateTime: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
    }
}

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

const URL = "http://localhost:3600"

export const socket = io(URL, {
    path: "/socket.io", 
    withCredentials: true,
    autoConnect: false,
});