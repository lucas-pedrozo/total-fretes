import React, { createContext, useContext, useState, useCallback } from "react";

type AlertStatus = "success" | "error" | "loading" | "alert";

interface NotificationState {
  status: AlertStatus;
  visible: boolean;
  message?: string;
  title?: string;
}

interface NotificationContextProps {
  showNotification: (status: AlertStatus, message?: string, title?: string) => void;
  hideNotification: () => void;
  notification: NotificationState;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<NotificationState>({
    visible: false,
    status: "loading",
    message: "",
    title: "",
  });

  const showNotification = useCallback((status: AlertStatus, message?: string, title?: string) => {
    setNotification({ visible: true, status, message, title });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification, notification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
};