import { useState, useEffect, useCallback } from "react";
import {
  initializeFCM,
  getFCMToken,
  getNotificationPermission,
  isNotificationSupported,
  cleanupFCM,
  onMessageListener,
  initServiceWorker,
} from "@/lib/firebase";

interface FCMState {
  token: string | null;
  permission: NotificationPermission;
  isSupported: boolean;
  isInitialized: boolean;
  error: string | null;
}

export const useFCM = () => {
  const [state, setState] = useState<FCMState>({
    token: null,
    permission: "default",
    isSupported: false,
    isInitialized: false,
    error: null,
  });

  // Initialize FCM
  const initialize = useCallback(async (): Promise<string | null> => {
    try {
      setState((prev) => ({ ...prev, error: null }));

      // Check if notifications are supported
      const supported = isNotificationSupported();
      if (!supported) {
        setState((prev) => ({
          ...prev,
          isSupported: false,
          isInitialized: true,
          error: "Push notifications are not supported in this browser",
        }));
        return null;
      }

      setState((prev) => ({ ...prev, isSupported: true }));

      // Initialize service worker
      await initServiceWorker();

      // Get current permission status
      const permission = getNotificationPermission();
      setState((prev) => ({ ...prev, permission }));

      if (permission === "denied") {
        setState((prev) => ({
          ...prev,
          isInitialized: true,
          error:
            "Notification permission was denied. Please enable it in your browser settings.",
        }));
        return null;
      }

      // Initialize FCM and get token
      const token = await initializeFCM();

      setState((prev) => ({
        ...prev,
        token,
        isInitialized: true,
      }));

      return token;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to initialize notifications";
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isInitialized: true,
      }));
      return null;
    }
  }, []);

  // Request notification permission manually
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const permission = await Notification.requestPermission();
      setState((prev) => ({ ...prev, permission }));

      if (permission === "granted") {
        // Re-initialize FCM to get token after permission granted
        await initialize();
        return true;
      } else if (permission === "denied") {
        setState((prev) => ({
          ...prev,
          error:
            "Notification permission denied. Please enable it in your browser settings.",
        }));
        return false;
      }
      return false;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to request notification permission";
      setState((prev) => ({ ...prev, error: errorMessage }));
      return false;
    }
  }, [initialize]);

  // Get current token (if already initialized)
  const refreshToken = useCallback(async (): Promise<string | null> => {
    try {
      const token = await getFCMToken();
      setState((prev) => ({ ...prev, token }));
      return token;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to refresh token";
      setState((prev) => ({ ...prev, error: errorMessage }));
      return null;
    }
  }, []);

  // Cleanup FCM (call on logout)
  const cleanup = useCallback(async (): Promise<void> => {
    try {
      await cleanupFCM(state.token || undefined);
      setState({
        token: null,
        permission: "default",
        isSupported: false,
        isInitialized: true,
        error: null,
      });
    } catch (error) {
      console.error("Error during FCM cleanup:", error);
    }
  }, [state.token]);

  // Listen for foreground messages
  const setupForegroundListener = useCallback(
    (callback: (payload: any) => void) => {
      if (!state.isSupported) return;

      const setupListener = async () => {
        try {
          const payload = await onMessageListener();
          callback(payload);
        } catch (error) {
          console.error("Error in foreground message listener:", error);
        }
      };

      // Set up periodic checking or use the promise-based listener
      // For now, we'll rely on the onMessageListener promise
    },
    [state.isSupported]
  );

  // Initialize on mount if supported
  useEffect(() => {
    if (typeof window !== "undefined" && isNotificationSupported()) {
      initialize();
    }
  }, [initialize]);

  return {
    // State
    token: state.token,
    permission: state.permission,
    isSupported: state.isSupported,
    isInitialized: state.isInitialized,
    error: state.error,

    // Actions
    initialize,
    requestPermission,
    refreshToken,
    cleanup,
    setupForegroundListener,

    // Derived state
    hasPermission: state.permission === "granted",
    canRequestPermission: state.permission === "default",
    isPermissionDenied: state.permission === "denied",
  };
};

// Hook for listening to foreground messages
export const useFCMForegroundMessages = (onMessage: (payload: any) => void) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const setupListener = async () => {
      try {
        const { onMessageListener } = await import("@/lib/firebase");
        const payload = await onMessageListener();
        onMessage(payload);
      } catch (error) {
        console.error("Error setting up foreground message listener:", error);
      }
    };

    setupListener();
  }, [onMessage]);
};
