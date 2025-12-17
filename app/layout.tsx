import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { AuthProvider } from "@/components/auth-provider";
import { WhatsAppChatBubble } from "@/components/whatsAppChatBubble";
import { NotificationProvider } from "@/contexts/NotificationContext";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import ThemeWrapper from "./ThemeWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Add this
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
  variable: "--font-poppins", // Add this
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "ACT Capital Driving School | Your Journey to Confident Driving Starts Here",
  description:
    "Professional driving lessons in Canberra, ACT. Learn to drive with experienced instructors, modern vehicles, and flexible scheduling. Book your lesson today!",
  generator: "v0.app",
  keywords:
    "driving school, driving lessons, Canberra, ACT, learn to drive, driving instructor",
  authors: [{ name: "ACT Capital Driving School" }],
  openGraph: {
    title: "ACT Capital Driving School",
    description: "Your Journey to Confident Driving Starts Here",
    type: "website",
    locale: "en_AU",
  },
};

// Handle foreground notifications
const handleForegroundNotification = (payload: any) => {
  console.log("Foreground notification received:", payload);

  // You can integrate with your toast system here
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
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${inter.variable} ${poppins.variable}`}
      >
        <ThemeWrapper>
          <AuthProvider>
            <NotificationProvider>
              <Suspense fallback={null}>{children}</Suspense>
            </NotificationProvider>
            <WhatsAppChatBubble />
          </AuthProvider>
          <Analytics />
        </ThemeWrapper>
      </body>
    </html>
  );
}
