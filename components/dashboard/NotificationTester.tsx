"use client";

import React, { useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";

export const NotificationTester: React.FC = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string>("");
  const { token, hasPermission } = useNotification();

  const testBackendConnection = async () => {
    if (!token) {
      setTestResult(
        "❌ No FCM token available. Please enable notifications first."
      );
      return;
    }

    setIsTesting(true);
    setTestResult("");

    try {
      // Test token registration with backend
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
        setTestResult("✅ Token successfully registered with backend!");
      } else {
        const errorText = await response.text();
        setTestResult(`❌ Backend registration failed: ${errorText}`);
      }
    } catch (error) {
      setTestResult(
        `❌ Connection error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsTesting(false);
    }
  };

  const testBrowserNotification = () => {
    if (!hasPermission) {
      setTestResult("❌ No notification permission granted");
      return;
    }

    // Test browser notification
    if ("Notification" in window) {
      new Notification("ACT Driving School - Test", {
        body: "This is a test notification from ACT Capital Driving School!",
        icon: "/icons/icon-192x192.png",
        badge: "/icons/badge-72x72.png",
      });
      setTestResult("✅ Browser notification test sent!");
    } else {
      setTestResult("❌ Browser notifications not supported");
    }
  };

  const triggerTestNotification = async () => {
    if (!token) {
      setTestResult("❌ No FCM token available");
      return;
    }

    setIsTesting(true);
    try {
      // You can call your backend to send a test notification
      // This requires adding a test endpoint to your backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/test`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            title: "Test Notification",
            body: "This is a test push notification from ACT Driving School!",
          }),
        }
      );

      if (response.ok) {
        setTestResult(
          "✅ Test notification sent to backend! Check your notifications."
        );
      } else {
        setTestResult("❌ Failed to send test notification");
      }
    } catch (error) {
      setTestResult(
        `❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Test Notifications
      </h3>

      <div className="space-y-4">
        {/* Test Results */}
        {testResult && (
          <div
            className={`p-3 rounded-md ${
              testResult.includes("✅")
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {testResult}
          </div>
        )}

        {/* Test Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={testBackendConnection}
            disabled={isTesting || !token}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isTesting ? "Testing..." : "Test Backend Connection"}
          </button>

          <button
            onClick={testBrowserNotification}
            disabled={!hasPermission}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Test Browser Notification
          </button>

          <button
            onClick={triggerTestNotification}
            disabled={isTesting || !token}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isTesting ? "Sending..." : "Send Test Push"}
          </button>
        </div>

        {/* Testing Instructions */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">
            Testing Instructions:
          </h4>
          <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
            <li>Enable notifications using the button above</li>
            <li>
              Click "Test Backend Connection" to verify token registration
            </li>
            <li>Click "Test Browser Notification" for immediate visual test</li>
            <li>
              Minimize browser and click "Send Test Push" for background test
            </li>
            <li>Check both foreground and background notifications</li>
          </ol>
        </div>

        {/* Debug Info */}
        <div className="text-xs text-gray-500">
          <p>
            Token:{" "}
            {token ? `✓ Present (${token.substring(0, 20)}...)` : "✗ Missing"}
          </p>
          <p>Permission: {hasPermission ? "✓ Granted" : "✗ Not granted"}</p>
        </div>
      </div>
    </div>
  );
};
