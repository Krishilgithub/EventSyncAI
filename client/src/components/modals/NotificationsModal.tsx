import { Dialog, Transition } from "@headlessui/react";
import { Switch } from "@headlessui/react";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notificationPrefs: {
    sms: boolean;
    email: boolean;
  };
  onToggle: (type: "sms" | "email") => void;
}

export default function NotificationsModal({
  isOpen,
  onClose,
  notificationPrefs,
  onToggle,
}: NotificationsModalProps) {
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
            <Dialog.Title className="text-lg font-medium mb-4">
              Notification Preferences
            </Dialog.Title>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  SMS Notifications
                </span>
                <Switch
                  checked={notificationPrefs.sms}
                  onChange={() => onToggle("sms")}
                  className={`${
                    notificationPrefs.sms
                      ? "bg-brand-gradient-from"
                      : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gradient-from focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      notificationPrefs.sms ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  Email Notifications
                </span>
                <Switch
                  checked={notificationPrefs.email}
                  onChange={() => onToggle("email")}
                  className={`${
                    notificationPrefs.email
                      ? "bg-brand-gradient-from"
                      : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gradient-from focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      notificationPrefs.email
                        ? "translate-x-6"
                        : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
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
