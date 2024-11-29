import { socket } from '../api/socket';
import { ChatMessage } from '../context/chat-context';

export const getFriendListWithLastMessage = (userId: string | undefined) => {
    if (userId === undefined) return;
    socket.emit('openChatBox', userId);
}

export const getFriendListWithLastMessageAndOther = (userId: string | undefined, chatPartnerUsername: string) => {
    if (userId === undefined) return;
    console.log('Open chat box with username:', chatPartnerUsername);
    socket.emit('openChatBoxWithUsername', userId, chatPartnerUsername);
}

export const displayMessageTime = (allMessages: ChatMessage[], message: ChatMessage, index: number) => {
    if (index === 0) {
        return true;
    }
    const previousMessage = (allMessages ?? [])[index - 1];
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

export function convertToThaiMonth(month: number) {
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

export function formatMessageTime(hour: number, minute: number) {
    // Adjust the hour if it is 24 or higher to get the correct 24-hour format
    hour = hour % 24;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}