import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import {
  ShareIcon,
  LinkIcon,
  QrCodeIcon,
  EnvelopeIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import QRCode from "qrcode.react";

interface EventSharingModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventUrl: string;
  onShareViaEmail: (emails: string[], message: string) => void;
  onShareViaSocial: (platform: string) => void;
}

export default function EventSharingModal({
  isOpen,
  onClose,
  eventTitle,
  eventUrl,
  onShareViaEmail,
  onShareViaSocial,
}: EventSharingModalProps) {
  const [activeTab, setActiveTab] = useState<
    "link" | "qr" | "email" | "social"
  >("link");
  const [emailList, setEmailList] = useState("");
  const [emailMessage, setEmailMessage] = useState(
    `Join me at ${eventTitle}! Here's the link: ${eventUrl}`
  );

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      // You might want to show a success toast here
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleShareViaEmail = () => {
    const emails = emailList
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email.length > 0);
    onShareViaEmail(emails, emailMessage);
  };

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: "facebook",
      color: "bg-blue-600",
    },
    {
      name: "Twitter",
      icon: "twitter",
      color: "bg-blue-400",
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      color: "bg-blue-700",
    },
    {
      name: "WhatsApp",
      icon: "whatsapp",
      color: "bg-green-500",
    },
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

          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <Dialog.Title className="text-lg font-medium mb-4 flex items-center">
              <ShareIcon className="w-5 h-5 mr-2" />
              Share Event
            </Dialog.Title>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab("link")}
                className={`flex items-center px-4 py-2 rounded-md ${
                  activeTab === "link"
                    ? "bg-brand-gradient-from text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <LinkIcon className="w-5 h-5 mr-2" />
                Link
              </button>
              <button
                onClick={() => setActiveTab("qr")}
                className={`flex items-center px-4 py-2 rounded-md ${
                  activeTab === "qr"
                    ? "bg-brand-gradient-from text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <QrCodeIcon className="w-5 h-5 mr-2" />
                QR Code
              </button>
              <button
                onClick={() => setActiveTab("email")}
                className={`flex items-center px-4 py-2 rounded-md ${
                  activeTab === "email"
                    ? "bg-brand-gradient-from text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <EnvelopeIcon className="w-5 h-5 mr-2" />
                Email
              </button>
              <button
                onClick={() => setActiveTab("social")}
                className={`flex items-center px-4 py-2 rounded-md ${
                  activeTab === "social"
                    ? "bg-brand-gradient-from text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <ChatBubbleLeftIcon className="w-5 h-5 mr-2" />
                Social
              </button>
            </div>

            <div className="space-y-4">
              {activeTab === "link" && (
                <div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={eventUrl}
                      readOnly
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Share this link with anyone you want to invite to the event
                  </p>
                </div>
              )}

              {activeTab === "qr" && (
                <div className="flex flex-col items-center">
                  <div className="p-4 bg-white rounded-lg">
                    <QRCode
                      value={eventUrl}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Scan this QR code to access the event
                  </p>
                  <button
                    onClick={() => {
                      // You might want to implement QR code download functionality
                    }}
                    className="mt-4 px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
                  >
                    Download QR Code
                  </button>
                </div>
              )}

              {activeTab === "email" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Addresses
                    </label>
                    <textarea
                      value={emailList}
                      onChange={(e) => setEmailList(e.target.value)}
                      placeholder="Enter email addresses separated by commas"
                      rows={3}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                      rows={4}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                    />
                  </div>

                  <button
                    onClick={handleShareViaEmail}
                    disabled={!emailList.trim()}
                    className={`w-full px-4 py-2 text-sm font-medium rounded-md ${
                      !emailList.trim()
                        ? "bg-gray-300 cursor-not-allowed"
                        : "text-white bg-brand-gradient-from hover:bg-brand-gradient-to"
                    }`}
                  >
                    Send Invitations
                  </button>
                </div>
              )}

              {activeTab === "social" && (
                <div className="grid grid-cols-2 gap-4">
                  {socialPlatforms.map((platform) => (
                    <button
                      key={platform.name}
                      onClick={() =>
                        onShareViaSocial(platform.name.toLowerCase())
                      }
                      className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-md text-white ${platform.color} hover:opacity-90`}
                    >
                      <span className="text-lg">
                        {platform.icon === "facebook" && "f"}
                        {platform.icon === "twitter" && "t"}
                        {platform.icon === "linkedin" && "in"}
                        {platform.icon === "whatsapp" && "wa"}
                      </span>
                      <span>{platform.name}</span>
                    </button>
                  ))}
                </div>
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
