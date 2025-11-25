"use client";

import React, { createContext, useContext, useEffect, ReactNode } from "react";
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
  onForegroundMessage?: (payload: any) => void;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  onForegroundMessage,
}) => {
  const fcm = useFCM();

  // Set up foreground message listener if callback provided
  useFCMForegroundMessages((payload) => {
    if (onForegroundMessage) {
      onForegroundMessage(payload);
    } else {
      // Default foreground message handling
      console.log("Received foreground message:", payload);

      // Show in-app notification or toast
      if (payload.notification) {
        const { title, body } = payload.notification;
        // You can integrate with your toast system here
        console.log("Notification:", title, body);
      }
    }
  });

  // Handle foreground messages with custom UI
  const handleForegroundMessage = (payload: any) => {
    console.log("Foreground message received:", payload);

    // You can show custom in-app notifications here
    // For example, using a toast library
    if (payload.notification) {
      const { title, body } = payload.notification;

      // Example: Show browser notification if permitted
      if (fcm.hasPermission && "Notification" in window) {
        new Notification(title, {
          body,
          icon: "/icons/icon-192x192.png",
        });
      }
    }
  };

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
