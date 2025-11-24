import {
  messaging,
  getFCMToken,
  requestNotificationPermission,
} from "./firebase";

// Register FCM token with backend
export const registerTokenWithBackend = async (
  token: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/register-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          device_type: "web",
        }),
      }
    );

    if (response.ok) {
      console.log("FCM token registered successfully with backend");
      return true;
    } else {
      console.error(
        "Failed to register FCM token with backend:",
        await response.text()
      );
      return false;
    }
  } catch (error) {
    console.error("Error registering FCM token with backend:", error);
    return false;
  }
};

// Unregister token from backend (when user logs out or revokes permission)
export const unregisterTokenFromBackend = async (
  token: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/unregister-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      }
    );

    if (response.ok) {
      console.log("FCM token unregistered successfully from backend");
      return true;
    } else {
      console.error(
        "Failed to unregister FCM token from backend:",
        await response.text()
      );
      return false;
    }
  } catch (error) {
    console.error("Error unregistering FCM token from backend:", error);
    return false;
  }
};

// Initialize FCM and get token
export const initializeFCM = async (): Promise<string | null> => {
  try {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return null;
    }

    // Check if service worker is supported
    if (!("serviceWorker" in navigator)) {
      console.warn("Service Worker not supported");
      return null;
    }

    // Request notification permission
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      console.warn("Notification permission denied");
      return null;
    }

    // Get FCM token
    const token = await getFCMToken();
    if (!token) {
      console.warn("Failed to get FCM token");
      return null;
    }

    // Register token with backend
    await registerTokenWithBackend(token);

    return token;
  } catch (error) {
    console.error("Error initializing FCM:", error);
    return null;
  }
};

// Check if notifications are supported
export const isNotificationSupported = (): boolean => {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
};

// Check current notification permission
export const getNotificationPermission = (): NotificationPermission => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "denied";
  }
  return Notification.permission;
};

// Monitor token refresh
export const monitorTokenRefresh = (
  callback: (token: string) => void
): (() => void) => {
  // This would typically set up a listener for token refresh
  // For now, we'll return a cleanup function
  console.log("Token refresh monitoring setup");

  return () => {
    console.log("Token refresh monitoring cleaned up");
  };
};

// Cleanup FCM (call when user logs out)
export const cleanupFCM = async (currentToken?: string): Promise<void> => {
  try {
    if (currentToken) {
      await unregisterTokenFromBackend(currentToken);
    }

    // Additional cleanup if needed
    console.log("FCM cleanup completed");
  } catch (error) {
    console.error("Error during FCM cleanup:", error);
  }
};
