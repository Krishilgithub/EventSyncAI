import { Dialog, Transition } from "@headlessui/react";
import { ClockIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface EventHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventHistory: Array<{
    title: string;
    date: string;
    attendance: number;
  }>;
  onClearHistory: () => void;
}

export default function EventHistoryModal({
  isOpen,
  onClose,
  eventHistory,
  onClearHistory,
}: EventHistoryModalProps) {
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
              <ClockIcon className="w-5 h-5 mr-2" />
              Event History
            </Dialog.Title>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {eventHistory.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No events in history
                </p>
              ) : (
                eventHistory.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                        {event.attendance}% attended
                      </span>
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={onClearHistory}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
              >
                Clear History
              </button>
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
