"use client";

import React from "react";
import { useNotification } from "@/contexts/NotificationContext";

const NotificationStatusCard: React.FC = () => {
  const {
    token,
    permission,
    isSupported,
    isInitialized,
    error,
    hasPermission,
    canRequestPermission,
    isPermissionDenied,
    requestPermission,
    refreshToken,
    cleanup,
  } = useNotification();

  if (!isInitialized) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (!isSupported) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">
              Notifications Not Supported
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Your browser doesn't support push notifications. Please try using
              a modern browser like Chrome, Firefox, or Edge.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          Notification Settings
        </h3>
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            hasPermission
              ? "bg-green-100 text-green-800"
              : isPermissionDenied
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {hasPermission
            ? "Enabled"
            : isPermissionDenied
            ? "Blocked"
            : "Pending"}
        </div>
      </div>

      <div className="space-y-4">
        {/* Permission Status */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Permission Status
          </label>
          <p className="text-sm text-gray-600 capitalize">{permission}</p>
        </div>

        {/* FCM Token */}
        {token && (
          <div>
            <label className="text-sm font-medium text-gray-700">
              FCM Token
            </label>
            <div className="mt-1">
              <code className="text-xs bg-gray-100 px-2 py-1 rounded break-all">
                {token.substring(0, 50)}...
              </code>
              <p className="text-xs text-gray-500 mt-1">
                Token is registered with backend and ready to receive
                notifications
              </p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {canRequestPermission && (
            <button
              onClick={requestPermission}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Enable Notifications
            </button>
          )}

          {hasPermission && (
            <>
              <button
                onClick={refreshToken}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Refresh Token
              </button>
              <button
                onClick={cleanup}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cleanup
              </button>
            </>
          )}

          {isPermissionDenied && (
            <p className="text-sm text-gray-600">
              Notifications are blocked. Please enable them in your browser
              settings.
            </p>
          )}
        </div>

        {/* Help Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                How it works
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Enable notifications to receive instant updates about your
                bookings, progress reports, and important announcements from ACT
                Capital Driving School.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationStatusCard;
