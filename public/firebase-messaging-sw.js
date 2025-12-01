// Firebase Service Worker - Config will be injected by client
const firebaseConfig = self.__FIREBASE_CONFIG__;

// Initialize Firebase App in service worker
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  const notificationTitle =
    payload.data?.title || payload.notification?.title || "New Notification";
  const notificationOptions = {
    body:
      payload.data?.body ||
      payload.notification?.body ||
      "You have a new notification",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-72x72.png",
    data: payload.data || {},
    actions: [
      { action: "open", title: "Open App" },
      { action: "close", title: "Close" },
    ],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "open" || event.action === "") {
    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clientList) => {
          for (const client of clientList) {
            if (
              client.url.includes(self.location.origin) &&
              "focus" in client
            ) {
              return client.focus();
            }
          }
          if (clients.openWindow) {
            return clients.openWindow(self.location.origin);
          }
        })
    );
  }
});
