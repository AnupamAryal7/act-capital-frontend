export const registerServiceWorker =
  async (): Promise<ServiceWorkerRegistration> => {
    if (!("serviceWorker" in navigator)) {
      throw new Error("Service workers are not supported in this browser");
    }

    // Inject Firebase config into service worker scope
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    // Register service worker
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
      {
        scope: "/",
      }
    );

    // Wait for service worker to be ready
    await navigator.serviceWorker.ready;

    // Inject Firebase config into service worker
    if (registration.active) {
      registration.active.postMessage({
        type: "FIREBASE_CONFIG",
        config: firebaseConfig,
      });
    }

    console.log("Service worker registered successfully");
    return registration;
  };

export const initializeServiceWorker =
  async (): Promise<ServiceWorkerRegistration | null> => {
    try {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        return await registerServiceWorker();
      }
      return null;
    } catch (error) {
      console.error("Service worker registration failed:", error);
      return null;
    }
  };
