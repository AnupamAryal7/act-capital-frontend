"use client";

import React from "react";
import { useNotification } from "@/contexts/NotificationContext";

const NotificationPrompt: React.FC = () => {
  const {
    canRequestPermission,
    isPermissionDenied,
    hasPermission,
    requestPermission,
    error,
    isSupported,
  } = useNotification();

  if (!isSupported) {
    return null; // Don't show prompt if not supported
  }

  if (hasPermission) {
    return (
      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">
              Notifications enabled
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isPermissionDenied) {
    return (
      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-red-800">
              Notifications blocked. Please enable them in your browser
              settings.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (canRequestPermission) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-blue-800">
              Enable Notifications
            </h3>
            <p className="mt-1 text-sm text-blue-700">
              Get instant updates about your bookings, progress reports, and
              important announcements.
            </p>
            <div className="mt-3">
              <button
                onClick={requestPermission}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Enable Notifications
              </button>
            </div>
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  return null;
};

// Simple notification status badge
export const NotificationStatus: React.FC = () => {
  const { hasPermission, isPermissionDenied, isSupported } = useNotification();

  if (!isSupported) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        Not Supported
      </span>
    );
  }

  if (hasPermission) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Enabled
      </span>
    );
  }

  if (isPermissionDenied) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Blocked
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
      Pending
    </span>
  );
};

export default NotificationPrompt;
