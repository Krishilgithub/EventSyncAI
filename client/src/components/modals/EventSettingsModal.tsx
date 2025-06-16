import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import {
  Cog6ToothIcon,
  GlobeAltIcon,
  BellIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  CalendarIcon,
  TicketIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

interface EventSettings {
  general: {
    title: string;
    description: string;
    timezone: string;
    language: string;
    currency: string;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    notificationTypes: {
      registration: boolean;
      checkIn: boolean;
      feedback: boolean;
      updates: boolean;
    };
  };
  tickets: {
    allowWaitlist: boolean;
    autoCheckIn: boolean;
    requireApproval: boolean;
    maxTicketsPerUser: number;
  };
  privacy: {
    publicEvent: boolean;
    showAttendeeList: boolean;
    allowSharing: boolean;
    requireLogin: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    ipRestriction: boolean;
    allowedDomains: string[];
    maxLoginAttempts: number;
  };
}

interface EventSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: EventSettings;
  onSaveSettings: (settings: EventSettings) => void;
}

export default function EventSettingsModal({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}: EventSettingsModalProps) {
  const [currentSettings, setCurrentSettings] =
    useState<EventSettings>(settings);
  const [activeTab, setActiveTab] = useState<
    "general" | "notifications" | "tickets" | "privacy" | "security"
  >("general");

  const handleSave = () => {
    onSaveSettings(currentSettings);
    onClose();
  };

  const tabs = [
    { id: "general", label: "General", icon: Cog6ToothIcon },
    { id: "notifications", label: "Notifications", icon: BellIcon },
    { id: "tickets", label: "Tickets", icon: TicketIcon },
    { id: "privacy", label: "Privacy", icon: UserGroupIcon },
    { id: "security", label: "Security", icon: ShieldCheckIcon },
  ];

  const timezones = [
    "UTC",
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Australia/Sydney",
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
  ];

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
    { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  ];

  return (
    <Transition show={isOpen}>
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4">
            <Dialog.Title className="text-lg font-medium mb-4 flex items-center">
              <Cog6ToothIcon className="w-5 h-5 mr-2" />
              Event Settings
            </Dialog.Title>

            <div className="flex space-x-4 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    activeTab === tab.id
                      ? "bg-brand-gradient-from text-white"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {activeTab === "general" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Event Title
                    </label>
                    <input
                      type="text"
                      value={currentSettings.general.title}
                      onChange={(e) =>
                        setCurrentSettings({
                          ...currentSettings,
                          general: {
                            ...currentSettings.general,
                            title: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={currentSettings.general.description}
                      onChange={(e) =>
                        setCurrentSettings({
                          ...currentSettings,
                          general: {
                            ...currentSettings.general,
                            description: e.target.value,
                          },
                        })
                      }
                      rows={3}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timezone
                    </label>
                    <select
                      value={currentSettings.general.timezone}
                      onChange={(e) =>
                        setCurrentSettings({
                          ...currentSettings,
                          general: {
                            ...currentSettings.general,
                            timezone: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                    >
                      {timezones.map((timezone) => (
                        <option key={timezone} value={timezone}>
                          {timezone}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Language
                      </label>
                      <select
                        value={currentSettings.general.language}
                        onChange={(e) =>
                          setCurrentSettings({
                            ...currentSettings,
                            general: {
                              ...currentSettings.general,
                              language: e.target.value,
                            },
                          })
                        }
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                      >
                        {languages.map((language) => (
                          <option key={language.code} value={language.code}>
                            {language.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Currency
                      </label>
                      <select
                        value={currentSettings.general.currency}
                        onChange={(e) =>
                          setCurrentSettings({
                            ...currentSettings,
                            general: {
                              ...currentSettings.general,
                              currency: e.target.value,
                            },
                          })
                        }
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                      >
                        {currencies.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.name} ({currency.symbol})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Notifications
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Send email notifications for important updates
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={
                          currentSettings.notifications.emailNotifications
                        }
                        onChange={(e) =>
                          setCurrentSettings({
                            ...currentSettings,
                            notifications: {
                              ...currentSettings.notifications,
                              emailNotifications: e.target.checked,
                            },
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-gradient-from"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Push Notifications
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Send push notifications to mobile devices
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={
                          currentSettings.notifications.pushNotifications
                        }
                        onChange={(e) =>
                          setCurrentSettings({
                            ...currentSettings,
                            notifications: {
                              ...currentSettings.notifications,
                              pushNotifications: e.target.checked,
                            },
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-gradient-from"></div>
                    </label>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Notification Types
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(
                        currentSettings.notifications.notificationTypes
                      ).map(([type, enabled]) => (
                        <div
                          key={type}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={enabled}
                              onChange={(e) =>
                                setCurrentSettings({
                                  ...currentSettings,
                                  notifications: {
                                    ...currentSettings.notifications,
                                    notificationTypes: {
                                      ...currentSettings.notifications
                                        .notificationTypes,
                                      [type]: e.target.checked,
                                    },
                                  },
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-gradient-from"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "tickets" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Allow Waitlist
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Enable waitlist for sold-out tickets
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentSettings.tickets.allowWaitlist}
                        onChange={(e) =>
                          setCurrentSettings({
                            ...currentSettings,
                            tickets: {
                              ...currentSettings.tickets,
                              allowWaitlist: e.target.checked,
                            },
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-gradient-from"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Auto Check-in
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Automatically check in attendees
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentSettings.tickets.autoCheckIn}
                        onChange={(e) =>
                          setCurrentSettings({
                            ...currentSettings,
                            tickets: {
                              ...currentSettings.tickets,
                              autoCheckIn: e.target.checked,
                            },
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-gradient-from"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Require Approval
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Require approval for ticket purchases
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentSettings.tickets.requireApproval}
                        onChange={(e) =>
                          setCurrentSettings({
                            ...currentSettings,
                            tickets: {
                              ...currentSettings.tickets,
                              requireApproval: e.target.checked,
                            },
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-gradient-from"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max Tickets Per User
                    </label>
                    <input
                      type="number"
                      value={currentSettings.tickets.maxTicketsPerUser}
                      onChange={(e) =>
                        setCurrentSettings({
                          ...currentSettings,
                          tickets: {
                            ...currentSettings.tickets,
                            maxTicketsPerUser: parseInt(e.target.value),
                          },
                        })
                      }
                      min="1"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                    />
                  </div>
                </div>
              )}

              {activeTab === "privacy" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Public Event
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Make event visible to everyone
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentSettings.privacy.publicEvent}
                        onChange={(e) =>
                          setCurrentSettings({
                            ...currentSettings,
                            privacy: {
                              ...currentSettings.privacy,
                              publicEvent: e.target.checked,
                            },
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-gradient-from"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Show Attendee List
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Display list of attendees
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentSettings.privacy.showAttendeeList}
                        onChange={(e) =>
                          setCurrentSettings({
                            ...currentSettings,
                            privacy: {
                              ...currentSettings.privacy,
                              showAttendeeList: e.target.checked,
                            },
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-gradient-from"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Allow Sharing
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Allow attendees to share event
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentSettings.privacy.allowSharing}
                        onChange={(e) =>
                          setCurrentSettings({
                            ...currentSettings,
                            privacy: {
                              ...currentSettings.privacy,
                              allowSharing: e.target.checked,
                            },
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-gradient-from"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Require Login
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Require login to view event
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentSettings.privacy.requireLogin}
                        onChange={(e) =>
                          setCurrentSettings({
                            ...currentSettings,
                            privacy: {
                              ...currentSettings.privacy,
                              requireLogin: e.target.checked,
                            },
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-gradient-from"></div>
                    </label>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Require 2FA for admin access
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentSettings.security.twoFactorAuth}
                        onChange={(e) =>
                          setCurrentSettings({
                            ...currentSettings,
                            security: {
                              ...currentSettings.security,
                              twoFactorAuth: e.target.checked,
                            },
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-gradient-from"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        IP Restriction
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Restrict access by IP address
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentSettings.security.ipRestriction}
                        onChange={(e) =>
                          setCurrentSettings({
                            ...currentSettings,
                            security: {
                              ...currentSettings.security,
                              ipRestriction: e.target.checked,
                            },
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gradient-from/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-gradient-from"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Allowed Email Domains
                    </label>
                    <div className="space-y-2">
                      {currentSettings.security.allowedDomains.map(
                        (domain, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="text"
                              value={domain}
                              onChange={(e) => {
                                const newDomains = [
                                  ...currentSettings.security.allowedDomains,
                                ];
                                newDomains[index] = e.target.value;
                                setCurrentSettings({
                                  ...currentSettings,
                                  security: {
                                    ...currentSettings.security,
                                    allowedDomains: newDomains,
                                  },
                                });
                              }}
                              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                            />
                            <button
                              onClick={() => {
                                const newDomains = [
                                  ...currentSettings.security.allowedDomains,
                                ];
                                newDomains.splice(index, 1);
                                setCurrentSettings({
                                  ...currentSettings,
                                  security: {
                                    ...currentSettings.security,
                                    allowedDomains: newDomains,
                                  },
                                });
                              }}
                              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              Remove
                            </button>
                          </div>
                        )
                      )}
                      <button
                        onClick={() =>
                          setCurrentSettings({
                            ...currentSettings,
                            security: {
                              ...currentSettings.security,
                              allowedDomains: [
                                ...currentSettings.security.allowedDomains,
                                "",
                              ],
                            },
                          })
                        }
                        className="text-sm text-brand-gradient-from hover:text-brand-gradient-to"
                      >
                        Add Domain
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max Login Attempts
                    </label>
                    <input
                      type="number"
                      value={currentSettings.security.maxLoginAttempts}
                      onChange={(e) =>
                        setCurrentSettings({
                          ...currentSettings,
                          security: {
                            ...currentSettings.security,
                            maxLoginAttempts: parseInt(e.target.value),
                          },
                        })
                      }
                      min="1"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                    />
                  </div>
                </div>
              )}
            </div>

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
