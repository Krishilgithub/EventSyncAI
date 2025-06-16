import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChatWithAI: () => void;
}

export default function HelpSupportModal({
  isOpen,
  onClose,
  onChatWithAI,
}: HelpSupportModalProps) {
  const [activeTab, setActiveTab] = useState<"faq" | "contact" | "tips">("faq");
  const [currentTip, setCurrentTip] = useState(0);

  const faqs = [
    {
      question: "How do I host an event?",
      answer:
        'Click the "Host Event" button on the dashboard, fill in the event details, and click "Create Event".',
    },
    {
      question: "How do I join an event?",
      answer:
        'Click the "Join Event" button on the dashboard, enter the event code, and click "Join".',
    },
    {
      question: "How do I manage notifications?",
      answer:
        "Click the bell icon in the hamburger menu to access notification preferences.",
    },
  ];

  const quickTips = [
    "Use templates to save time! ✨",
    "Enable reminders for better attendance 📅",
    "Create teams for recurring events 👥",
    "Export events to your calendar 📱",
  ];

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    alert("Thank you for your message! We will get back to you soon.");
  };

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % quickTips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + quickTips.length) % quickTips.length);
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
              <QuestionMarkCircleIcon className="w-5 h-5 mr-2" />
              Help & Support
            </Dialog.Title>

            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setActiveTab("faq")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === "faq"
                    ? "text-white bg-brand-gradient-from"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                FAQs
              </button>
              <button
                onClick={() => setActiveTab("contact")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === "contact"
                    ? "text-white bg-brand-gradient-from"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Contact
              </button>
              <button
                onClick={() => setActiveTab("tips")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === "tips"
                    ? "text-white bg-brand-gradient-from"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Quick Tips
              </button>
            </div>

            {activeTab === "faq" && (
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "contact" && (
              <form onSubmit={handleSubmitContact} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
                >
                  Send Message
                </button>
              </form>
            )}

            {activeTab === "tips" && (
              <div className="space-y-4">
                <div className="relative p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-center text-gray-900 dark:text-white">
                    {quickTips[currentTip]}
                  </p>
                  <button
                    onClick={prevTip}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTip}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={onChatWithAI}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md flex items-center justify-center"
                >
                  <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                  Chat with AI
                </button>
              </div>
            )}

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
