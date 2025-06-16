import { Dialog, Transition } from '@headlessui/react';
import { BellAlertIcon, CheckIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

interface NotificationsCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onClearAll: () => void;
  onToggleNotification: (type: string) => void;
}

export default function NotificationsCenterModal({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onClearAll,
  onToggleNotification,
}: NotificationsCenterModalProps) {
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
            <Dialog.Title className="text-lg font-medium mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <BellAlertIcon className="w-5 h-5 mr-2" />
                Notifications Center
              </div>
              <button
                onClick={onClearAll}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear All
              </button>
            </Dialog.Title>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notification Preferences
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      onChange={() => onToggleNotification('rsvp')}
                      className="h-4 w-4 text-brand-gradient-from focus:ring-brand-gradient-from border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      RSVP Updates
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      onChange={() => onToggleNotification('reminders')}
                      className="h-4 w-4 text-brand-gradient-from focus:ring-brand-gradient-from border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Event Reminders
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      onChange={() => onToggleNotification('team')}
                      className="h-4 w-4 text-brand-gradient-from focus:ring-brand-gradient-from border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Team Updates
                    </span>
                  </label>
                </div>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    No notifications
                  </p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg ${
                        notification.read
                          ? 'bg-gray-50 dark:bg-gray-700'
                          : 'bg-brand-gradient-from/10 dark:bg-brand-gradient-from/20'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <p
                          className={`text-sm ${
                            notification.read
                              ? 'text-gray-700 dark:text-gray-300'
                              : 'text-gray-900 dark:text-white font-medium'
                          }`}
                        >
                          {notification.message}
                        </p>
                        {!notification.read && (
                          <button
                            onClick={() => onMarkAsRead(notification.id)}
                            className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            <CheckIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
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