import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  type Messaging,
} from "firebase/messaging";
import { initializeServiceWorker } from "./serviceWorker";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize messaging only on client side
let messagingInstance: Messaging | null = null;

export const getMessagingInstance = (): Messaging | null => {
  if (typeof window === "undefined") {
    return null;
  }

  if (messagingInstance) {
    return messagingInstance;
  }

  try {
    messagingInstance = getMessaging(app);
    return messagingInstance;
  } catch (error) {
    console.error("Failed to initialize messaging:", error);
    return null;
  }
};

// Export messaging getter for backward compatibility
export const messaging =
  typeof window !== "undefined" ? getMessagingInstance() : null;

// Initialize service worker
export const initServiceWorker = initializeServiceWorker;

// Handle foreground messages
export const onMessageListener = () => {
  return new Promise((resolve, reject) => {
    const messagingInstance = getMessagingInstance();

    if (!messagingInstance) {
      reject(new Error("Messaging not supported"));
      return;
    }

    onMessage(messagingInstance, (payload) => {
      resolve(payload);
    });
  });
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return false;
  }
};

// Get FCM token
export const getFCMToken = async (): Promise<string | null> => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const messagingInstance = getMessagingInstance();

    if (!messagingInstance) {
      console.warn("Messaging not supported");
      return null;
    }

    // Check if service worker is supported and registered
    if (!("serviceWorker" in navigator)) {
      console.warn("Service Worker not supported");
      return null;
    }

    const registration = await navigator.serviceWorker.ready;

    const currentToken = await getToken(messagingInstance, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      serviceWorkerRegistration: registration,
    });

    if (currentToken) {
      console.log("FCM token:", currentToken);
      return currentToken;
    } else {
      console.warn(
        "No registration token available. Request permission to generate one."
      );
      return null;
    }
  } catch (error) {
    console.error("An error occurred while retrieving token:", error);
    return null;
  }
};
