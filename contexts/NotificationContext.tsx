"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useFCM, useFCMForegroundMessages } from "@/hooks/useFCM";

interface NotificationContextType {
  // State
  token: string | null;
  permission: NotificationPermission;
  isSupported: boolean;
  isInitialized: boolean;
  error: string | null;

  // Actions
  requestPermission: () => Promise<boolean>;
  refreshToken: () => Promise<string | null>;
  cleanup: () => Promise<void>;

  // Derived state
  hasPermission: boolean;
  canRequestPermission: boolean;
  isPermissionDenied: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const fcm = useFCM();

  // Handle foreground notifications
  const handleForegroundNotification = (payload: any) => {
    console.log("Foreground notification received:", payload);

    // Show in-app notification or toast
    if (payload.notification && typeof window !== "undefined") {
      const { title, body } = payload.notification;

      // Show browser notification if permitted
      if (Notification.permission === "granted") {
        new Notification(title, {
          body,
          icon: "/icons/icon-192x192.png",
        });
      }

      // TODO: Integrate with your toast notification system
      // Example: showToast({ title, message: body, type: 'info' });
      console.log("Notification:", title, body);
    }
  };

  // Set up foreground message listener
  useFCMForegroundMessages(handleForegroundNotification);

  return (
    <NotificationContext.Provider
      value={{
        ...fcm,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
