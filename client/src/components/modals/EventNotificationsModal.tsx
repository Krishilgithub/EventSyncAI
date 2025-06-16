import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import {
  BellIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";

interface Notification {
  id: string;
  type: "email" | "push" | "sms" | "in-app";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface EventNotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (notificationId: string) => void;
  onDeleteNotification: (notificationId: string) => void;
  onUpdateNotificationPreferences: (preferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
    inApp: boolean;
  }) => void;
}

export default function EventNotificationsModal({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onDeleteNotification,
  onUpdateNotificationPreferences,
}: EventNotificationsModalProps) {
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [preferences, setPreferences] = useState({
    email: true,
    push: true,
    sms: false,
    inApp: true,
  });

  const handlePreferenceChange = (type: keyof typeof preferences) => {
    const newPreferences = {
      ...preferences,
      [type]: !preferences[type],
    };
    setPreferences(newPreferences);
    onUpdateNotificationPreferences(newPreferences);
  };

  const filteredNotifications = notifications.filter(
    (notification) => activeTab === "all" || !notification.read
  );

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "email":
        return <EnvelopeIcon className="w-5 h-5" />;
      case "push":
        return <DevicePhoneMobileIcon className="w-5 h-5" />;
      case "sms":
        return <DevicePhoneMobileIcon className="w-5 h-5" />;
      case "in-app":
        return <ChatBubbleLeftIcon className="w-5 h-5" />;
      default:
        return <BellIcon className="w-5 h-5" />;
    }
  };

  return (
    <Transition show={isOpen}>
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
            <Dialog.Title className="text-lg font-medium mb-4 flex items-center">
              <BellIcon className="w-5 h-5 mr-2" />
              Notifications
            </Dialog.Title>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab("all")}
                className={`flex items-center px-4 py-2 rounded-md ${
                  activeTab === "all"
                    ? "bg-brand-gradient-from text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab("unread")}
                className={`flex items-center px-4 py-2 rounded-md ${
                  activeTab === "unread"
                    ? "bg-brand-gradient-from text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Unread
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Notification Preferences
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <EnvelopeIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Email Notifications
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.email}
                      onChange={() => handlePreferenceChange("email")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-gradient-from"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <DevicePhoneMobileIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Push Notifications
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.push}
                      onChange={() => handlePreferenceChange("push")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-gradient-from"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <DevicePhoneMobileIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      SMS Notifications
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.sms}
                      onChange={() => handlePreferenceChange("sms")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-gradient-from"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <ChatBubbleLeftIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      In-App Notifications
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.inApp}
                      onChange={() => handlePreferenceChange("inApp")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-gradient-from"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8">
                  <BellIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No notifications to display
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg ${
                      notification.read
                        ? "bg-gray-50 dark:bg-gray-700"
                        : "bg-white dark:bg-gray-800 border border-brand-gradient-from"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div
                          className={`p-2 rounded-full ${
                            notification.read
                              ? "bg-gray-200 dark:bg-gray-600"
                              : "bg-brand-gradient-from/10"
                          }`}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {notification.title}
                          </h4>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {notification.message}
                          </p>
                          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <button
                            onClick={() => onMarkAsRead(notification.id)}
                            className="text-sm text-brand-gradient-from hover:text-brand-gradient-to"
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteNotification(notification.id)}
                          className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
