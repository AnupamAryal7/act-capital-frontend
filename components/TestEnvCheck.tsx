"use client";

import React from "react";

export const TestEnvCheck: React.FC = () => {
  const envVars = {
    apiUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    firebaseApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY
      ? "Set"
      : "Missing",
    firebaseProjectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    vapidKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ? "Set" : "Missing",
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-medium text-yellow-800 mb-2">
        Environment Check
      </h3>
      <pre className="text-sm bg-white p-3 rounded border">
        {JSON.stringify(envVars, null, 2)}
      </pre>
    </div>
  );
};
