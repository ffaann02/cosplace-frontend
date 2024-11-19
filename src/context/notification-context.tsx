import React, {
    createContext,
    useState,
    ReactNode,
    useContext,
} from "react";

export interface NotificationInterface {
    notification_id: string;
    send_from: string;
    send_to: string;
    type: string;
    sender_id?: string;
    reciever_id?: string;
    message: string;
    is_read: boolean;
    date_time: Date;
    date_time_formatted: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
    }
}

interface NotificationContextType {
    notifications: NotificationInterface[];
    setNotifications: React.Dispatch<React.SetStateAction<NotificationInterface[]>>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const NotificationProvider = ({ children }: { children: ReactNode }) => {

    const [notifications, setNotifications] = useState<NotificationInterface[]>([]);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                setNotifications
            }}>
            {children}
        </NotificationContext.Provider>
    );
}

const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}

export { NotificationProvider, useNotification };