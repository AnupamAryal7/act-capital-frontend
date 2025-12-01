"use client";

import React from "react";
import NotificationStatusCard from "@/components/dashboard/NotificationStatusCard";
import NotificationPrompt from "@/components/ui/NotificationPrompt";
import NotificationTester from "@/components/dashboard/NotificationTester";

export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-2 text-gray-600">
            Manage your notification preferences and stay updated with your
            driving lessons.
          </p>
        </div>

        {/* Notification Prompt */}
        <div className="mb-6">
          <NotificationPrompt />
        </div>

        {/* Notification Status Card */}
        <NotificationStatusCard />

        {/* Test Notifications Section */}
        <div className="mt-8">
          <NotificationTester />
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            About Notifications
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Once notifications are enabled, you'll automatically receive updates
            for:
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">
              What you'll receive:
            </h4>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>New booking confirmations</li>
              <li>Progress report updates</li>
              <li>Instructor assignments</li>
              <li>Lesson reminders</li>
              <li>Important announcements</li>
            </ul>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            <p>
              💡 <strong>Tip:</strong> Notifications work even when the website
              is closed, just like a mobile app!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
