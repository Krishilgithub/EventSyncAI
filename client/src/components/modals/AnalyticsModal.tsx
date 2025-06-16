import { Dialog, Transition } from "@headlessui/react";
import { ChartBarIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  analytics: {
    hosted: number;
    avgAttendance: number;
    joined: number;
    rsvpRate: number;
  };
  onExportReport: () => void;
}

export default function AnalyticsModal({
  isOpen,
  onClose,
  analytics,
  onExportReport,
}: AnalyticsModalProps) {
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
              <ChartBarIcon className="w-5 h-5 mr-2" />
              Event Analytics
            </Dialog.Title>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Hosted Events
                  </h3>
                  <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                    {analytics.hosted}
                  </p>
                  <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                    Avg. Attendance: {analytics.avgAttendance}%
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Joined Events
                  </h3>
                  <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                    {analytics.joined}
                  </p>
                  <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                    RSVP Rate: {analytics.rsvpRate}%
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                  Attendance Trends
                </h3>
                <div className="h-32 flex items-end space-x-2">
                  {[65, 75, 85, 70, 90, 85].map((value, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-brand-gradient-from rounded-t"
                      style={{ height: `${value}%` }}
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>

              <button
                onClick={onExportReport}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md flex items-center justify-center"
              >
                <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                Export Report
              </button>
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
