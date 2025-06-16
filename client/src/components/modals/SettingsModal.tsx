import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import {
  Cog6ToothIcon,
  BellIcon,
  MoonIcon,
  SunIcon,
  LanguageIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSettings: (settings: any) => void;
  initialSettings: {
    theme: "light" | "dark" | "system";
    language: string;
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    timezone: string;
  };
}

export default function SettingsModal({
  isOpen,
  onClose,
  onSaveSettings,
  initialSettings,
}: SettingsModalProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState<
    "general" | "notifications" | "appearance"
  >("general");

  const handleSave = () => {
    onSaveSettings(settings);
    onClose();
  };

  const handleThemeChange = (theme: "light" | "dark" | "system") => {
    setSettings((prev) => ({ ...prev, theme }));
  };

  const handleLanguageChange = (language: string) => {
    setSettings((prev) => ({ ...prev, language }));
  };

  const handleNotificationChange = (
    type: "email" | "push" | "sms",
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [type]: value },
    }));
  };

  const handleTimezoneChange = (timezone: string) => {
    setSettings((prev) => ({ ...prev, timezone }));
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

          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <Dialog.Title className="text-lg font-medium mb-4 flex items-center">
              <Cog6ToothIcon className="w-5 h-5 mr-2" />
              Settings
            </Dialog.Title>

            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setActiveTab("general")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === "general"
                    ? "text-white bg-brand-gradient-from"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                General
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === "notifications"
                    ? "text-white bg-brand-gradient-from"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Notifications
              </button>
              <button
                onClick={() => setActiveTab("appearance")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === "appearance"
                    ? "text-white bg-brand-gradient-from"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Appearance
              </button>
            </div>

            {activeTab === "general" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Timezone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleTimezoneChange(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time</option>
                    <option value="CST">Central Time</option>
                    <option value="PST">Pacific Time</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BellIcon className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Notifications
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.email}
                      onChange={(e) =>
                        handleNotificationChange("email", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-gradient-from"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BellIcon className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Push Notifications
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.push}
                      onChange={(e) =>
                        handleNotificationChange("push", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-gradient-from"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BellIcon className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      SMS Notifications
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.sms}
                      onChange={(e) =>
                        handleNotificationChange("sms", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-gradient-from"></div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Theme
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleThemeChange("light")}
                      className={`p-3 rounded-lg border-2 flex flex-col items-center ${
                        settings.theme === "light"
                          ? "border-brand-gradient-from"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <SunIcon className="w-6 h-6 mb-1" />
                      <span className="text-xs">Light</span>
                    </button>
                    <button
                      onClick={() => handleThemeChange("dark")}
                      className={`p-3 rounded-lg border-2 flex flex-col items-center ${
                        settings.theme === "dark"
                          ? "border-brand-gradient-from"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <MoonIcon className="w-6 h-6 mb-1" />
                      <span className="text-xs">Dark</span>
                    </button>
                    <button
                      onClick={() => handleThemeChange("system")}
                      className={`p-3 rounded-lg border-2 flex flex-col items-center ${
                        settings.theme === "system"
                          ? "border-brand-gradient-from"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <GlobeAltIcon className="w-6 h-6 mb-1" />
                      <span className="text-xs">System</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
