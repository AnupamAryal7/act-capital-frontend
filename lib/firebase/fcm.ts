import {
  getFCMToken,
  requestNotificationPermission,
  getMessagingInstance,
} from "./firebase";
import { deleteToken } from "firebase/messaging";

/**
 * Check if notification is supported in the browser
 */
export const isNotificationSupported = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    "Notification" in window &&
    "serviceWorker" in navigator &&
    "PushManager" in window
  );
};

/**
 * Get current notification permission status
 */
export const getNotificationPermission = (): NotificationPermission => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "default";
  }

  return Notification.permission;
};

/**
 * Initialize FCM and get token
 */
export const initializeFCM = async (): Promise<string | null> => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    // Check if notifications are supported
    if (!isNotificationSupported()) {
      throw new Error("Push notifications are not supported in this browser");
    }

    // Check permission
    const permission = getNotificationPermission();

    if (permission === "denied") {
      throw new Error(
        "Notification permission denied. Please enable it in your browser settings."
      );
    }

    // Request permission if not granted
    if (permission === "default") {
      const granted = await requestNotificationPermission();
      if (!granted) {
        throw new Error("Notification permission not granted");
      }
    }

    // Get FCM token
    const token = await getFCMToken();
    return token;
  } catch (error) {
    console.error("Error initializing FCM:", error);
    throw error;
  }
};

/**
 * Cleanup FCM (delete token)
 */
export const cleanupFCM = async (token?: string): Promise<void> => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const messagingInstance = getMessagingInstance();

    if (!messagingInstance) {
      console.warn("Messaging not available for cleanup");
      return;
    }

    await deleteToken(messagingInstance);
    console.log("FCM token deleted successfully");
  } catch (error) {
    console.error("Error cleaning up FCM:", error);
    throw error;
  }
};
