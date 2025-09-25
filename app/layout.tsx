import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { AuthProvider } from "@/components/auth-provider";
import { WhatsAppChatBubble } from "@/components/whatsAppChatBubble";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <WhatsAppChatBubble />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
