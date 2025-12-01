"use client";

import React from "react";

const DebugFirebaseConfig: React.FC = () => {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "✅ Set" : "❌ Missing",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
      ? "✅ Set"
      : "❌ Missing",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      ? "✅ Set"
      : "❌ Missing",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
      ? "✅ Set"
      : "❌ Missing",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? "✅ Set" : "❌ Missing",
    vapidKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      ? "✅ Set"
      : "❌ Missing",
    apiUrl: process.env.NEXT_PUBLIC_API_BASE_URL ? "✅ Set" : "❌ Missing",
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-medium text-yellow-800 mb-2">
        Firebase Configuration Status
      </h3>
      <div className="space-y-1 text-sm">
        {Object.entries(config).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="font-medium">{key}:</span>
            <span
              className={
                value.includes("✅") ? "text-green-600" : "text-red-600"
              }
            >
              {value}
            </span>
          </div>
        ))}
      </div>
      {config.apiKey.includes("❌") && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-sm text-red-800">
            <strong>Fix needed:</strong> Add Firebase configuration to your .env
            file. Go to{" "}
            <a
              href="https://console.firebase.google.com/"
              target="_blank"
              className="underline"
            >
              Firebase Console
            </a>
            , create a web app, and copy the configuration.
          </p>
        </div>
      )}
    </div>
  );
};

export default DebugFirebaseConfig;
