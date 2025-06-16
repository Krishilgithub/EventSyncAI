import { Dialog, Transition } from "@headlessui/react";
import { CalendarIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncCalendar: () => void;
  onExportEvent: () => void;
  eventDates: string[];
}

export default function CalendarModal({
  isOpen,
  onClose,
  onSyncCalendar,
  onExportEvent,
  eventDates,
}: CalendarModalProps) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const renderCalendar = () => {
    const days = [];
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Add week day headers
    weekDays.forEach((day) => {
      days.push(
        <div
          key={day}
          className="text-center text-sm font-medium text-gray-500 dark:text-gray-400"
        >
          {day}
        </div>
      );
    });

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8" />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      const hasEvent = eventDates.includes(date);

      days.push(
        <div
          key={day}
          className={`relative h-8 flex items-center justify-center text-sm ${
            hasEvent
              ? "text-white bg-brand-gradient-from rounded-full"
              : "text-gray-700 dark:text-gray-300"
          }`}
        >
          {day}
          {hasEvent && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-brand-gradient-from rounded-full" />
          )}
        </div>
      );
    }

    return days;
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
              <CalendarIcon className="w-5 h-5 mr-2" />
              Calendar Integration
            </Dialog.Title>

            <div className="space-y-6">
              <button
                onClick={onSyncCalendar}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
              >
                Sync with Google Calendar
              </button>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  June 2025
                </h3>
                <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
              </div>

              <button
                onClick={onExportEvent}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md flex items-center justify-center"
              >
                <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                Export Event (.ics)
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
