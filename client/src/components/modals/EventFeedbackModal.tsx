import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import {
  ChatBubbleLeftRightIcon,
  StarIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  FaceNeutralIcon,
} from "@heroicons/react/24/outline";

interface Feedback {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  sentiment: "positive" | "negative" | "neutral";
  comment: string;
  categories: string[];
  timestamp: string;
  likes: number;
  replies: {
    id: string;
    userId: string;
    userName: string;
    comment: string;
    timestamp: string;
  }[];
}

interface EventFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: Feedback[];
  onAddFeedback: (
    feedback: Omit<Feedback, "id" | "timestamp" | "likes" | "replies">
  ) => void;
  onAddReply: (
    feedbackId: string,
    reply: Omit<Feedback["replies"][0], "id" | "timestamp">
  ) => void;
  onLikeFeedback: (feedbackId: string) => void;
}

export default function EventFeedbackModal({
  isOpen,
  onClose,
  feedback,
  onAddFeedback,
  onAddReply,
  onLikeFeedback,
}: EventFeedbackModalProps) {
  const [newFeedback, setNewFeedback] = useState({
    rating: 5,
    sentiment: "positive" as const,
    comment: "",
    categories: [] as string[],
  });

  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleSubmitFeedback = () => {
    onAddFeedback({
      userId: "current-user", // Replace with actual user ID
      userName: "Current User", // Replace with actual user name
      ...newFeedback,
    });
    setNewFeedback({
      rating: 5,
      sentiment: "positive",
      comment: "",
      categories: [],
    });
  };

  const handleSubmitReply = (feedbackId: string) => {
    onAddReply(feedbackId, {
      userId: "current-user", // Replace with actual user ID
      userName: "Current User", // Replace with actual user name
      comment: replyText,
    });
    setReplyText("");
    setReplyingTo(null);
  };

  const getSentimentIcon = (sentiment: Feedback["sentiment"]) => {
    switch (sentiment) {
      case "positive":
        return <FaceSmileIcon className="w-5 h-5 text-green-500" />;
      case "negative":
        return <FaceFrownIcon className="w-5 h-5 text-red-500" />;
      case "neutral":
        return <FaceNeutralIcon className="w-5 h-5 text-yellow-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4">
            <Dialog.Title className="text-lg font-medium mb-4 flex items-center">
              <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
              Event Feedback
            </Dialog.Title>

            <div className="space-y-6">
              {/* New Feedback Form */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Share Your Feedback
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rating
                    </label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() =>
                            setNewFeedback({ ...newFeedback, rating })
                          }
                          className={`p-1 rounded-full ${
                            newFeedback.rating >= rating
                              ? "text-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        >
                          <StarIcon className="w-6 h-6" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sentiment
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() =>
                          setNewFeedback({
                            ...newFeedback,
                            sentiment: "positive",
                          })
                        }
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                          newFeedback.sentiment === "positive"
                            ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        <FaceSmileIcon className="w-5 h-5" />
                        <span>Positive</span>
                      </button>
                      <button
                        onClick={() =>
                          setNewFeedback({
                            ...newFeedback,
                            sentiment: "neutral",
                          })
                        }
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                          newFeedback.sentiment === "neutral"
                            ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        <FaceNeutralIcon className="w-5 h-5" />
                        <span>Neutral</span>
                      </button>
                      <button
                        onClick={() =>
                          setNewFeedback({
                            ...newFeedback,
                            sentiment: "negative",
                          })
                        }
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                          newFeedback.sentiment === "negative"
                            ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        <FaceFrownIcon className="w-5 h-5" />
                        <span>Negative</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Comment
                    </label>
                    <textarea
                      value={newFeedback.comment}
                      onChange={(e) =>
                        setNewFeedback({
                          ...newFeedback,
                          comment: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                      placeholder="Share your thoughts about the event..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Categories
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Organization",
                        "Content",
                        "Venue",
                        "Staff",
                        "Value",
                      ].map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            const categories = newFeedback.categories.includes(
                              category
                            )
                              ? newFeedback.categories.filter(
                                  (c) => c !== category
                                )
                              : [...newFeedback.categories, category];
                            setNewFeedback({ ...newFeedback, categories });
                          }}
                          className={`px-3 py-1 rounded-full text-sm ${
                            newFeedback.categories.includes(category)
                              ? "bg-brand-gradient-from text-white"
                              : "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSubmitFeedback}
                      disabled={!newFeedback.comment.trim()}
                      className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </div>
              </div>

              {/* Feedback List */}
              <div className="space-y-4">
                {feedback.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                            {getSentimentIcon(item.sentiment)}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.userName}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={`w-4 h-4 ${
                                    item.rating >= rating
                                      ? "text-yellow-400"
                                      : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(item.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onLikeFeedback(item.id)}
                        className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-brand-gradient-from dark:hover:text-brand-gradient-to"
                      >
                        <ThumbUpIcon className="w-5 h-5" />
                        <span className="text-sm">{item.likes}</span>
                      </button>
                    </div>

                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                      {item.comment}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.categories.map((category) => (
                        <span
                          key={category}
                          className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                        >
                          {category}
                        </span>
                      ))}
                    </div>

                    {/* Replies */}
                    {item.replies.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {item.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="ml-12 pl-4 border-l-2 border-gray-200 dark:border-gray-600"
                          >
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {reply.userName}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {formatDate(reply.timestamp)}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                              {reply.comment}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Form */}
                    {replyingTo === item.id ? (
                      <div className="mt-4 ml-12">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={2}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                          placeholder="Write a reply..."
                        />
                        <div className="mt-2 flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText("");
                            }}
                            className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSubmitReply(item.id)}
                            disabled={!replyText.trim()}
                            className="px-3 py-1 text-sm text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setReplyingTo(item.id)}
                        className="mt-4 ml-12 text-sm text-brand-gradient-from hover:text-brand-gradient-to"
                      >
                        Reply
                      </button>
                    )}
                  </div>
                ))}
              </div>
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
