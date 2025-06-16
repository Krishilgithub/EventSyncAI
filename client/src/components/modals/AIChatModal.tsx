import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (message: string) => Promise<void>;
}

export default function AIChatModal({
  isOpen,
  onClose,
  onSendMessage,
}: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      await onSendMessage(input);
      // The AI response will be handled by the parent component
      // and added to messages through props
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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

          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <Dialog.Title className="text-lg font-medium mb-4 flex items-center">
              <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
              AI Assistant
            </Dialog.Title>

            <div className="h-96 flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    <ChatBubbleLeftRightIcon className="w-8 h-8 mx-auto mb-2" />
                    <p>How can I help you today?</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-brand-gradient-from text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                      <ArrowPathIcon className="w-5 h-5 animate-spin text-gray-500" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border-gray-300 focus:border-brand-gradient-from focus:ring-brand-gradient-from resize-none"
                  rows={2}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={`px-4 py-2 rounded-lg ${
                    !input.trim() || isLoading
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-brand-gradient-from hover:bg-brand-gradient-to"
                  }`}
                >
                  <PaperAirplaneIcon className="w-5 h-5 text-white" />
                </button>
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
