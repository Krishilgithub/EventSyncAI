import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

interface Session {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  speakers: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  }[];
  capacity: number;
  registeredAttendees: number;
  type: "keynote" | "workshop" | "panel" | "break" | "other";
  tags: string[];
}

interface EventScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: Session[];
  onAddSession: (session: Omit<Session, "id" | "registeredAttendees">) => void;
  onUpdateSession: (sessionId: string, session: Partial<Session>) => void;
  onDeleteSession: (sessionId: string) => void;
}

export default function EventScheduleModal({
  isOpen,
  onClose,
  sessions,
  onAddSession,
  onUpdateSession,
  onDeleteSession,
}: EventScheduleModalProps) {
  const [isAddingSession, setIsAddingSession] = useState(false);
  const [editingSession, setEditingSession] = useState<string | null>(null);
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(
    new Set()
  );
  const [newSession, setNewSession] = useState<
    Omit<Session, "id" | "registeredAttendees">
  >({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    location: "",
    speakers: [],
    capacity: 0,
    type: "other",
    tags: [],
  });

  const handleAddSession = () => {
    onAddSession(newSession);
    setNewSession({
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      location: "",
      speakers: [],
      capacity: 0,
      type: "other",
      tags: [],
    });
    setIsAddingSession(false);
  };

  const handleUpdateSession = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      onUpdateSession(sessionId, {
        ...session,
        ...newSession,
      });
    }
    setEditingSession(null);
  };

  const handleDeleteSession = (sessionId: string) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      onDeleteSession(sessionId);
    }
  };

  const toggleSessionExpansion = (sessionId: string) => {
    const newExpanded = new Set(expandedSessions);
    if (newExpanded.has(sessionId)) {
      newExpanded.delete(sessionId);
    } else {
      newExpanded.add(sessionId);
    }
    setExpandedSessions(newExpanded);
  };

  const getSessionTypeColor = (type: Session["type"]) => {
    switch (type) {
      case "keynote":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400";
      case "workshop":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
      case "panel":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
      case "break":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const sessionTypes = [
    { value: "keynote", label: "Keynote" },
    { value: "workshop", label: "Workshop" },
    { value: "panel", label: "Panel" },
    { value: "break", label: "Break" },
    { value: "other", label: "Other" },
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
            <Dialog.Title className="text-lg font-medium mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Event Schedule
              </div>
              <button
                onClick={() => setIsAddingSession(true)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </Dialog.Title>

            {isAddingSession && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Session Title
                  </label>
                  <input
                    type="text"
                    value={newSession.title}
                    onChange={(e) =>
                      setNewSession({ ...newSession, title: e.target.value })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newSession.description}
                    onChange={(e) =>
                      setNewSession({
                        ...newSession,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Start Time
                    </label>
                    <input
                      type="datetime-local"
                      value={newSession.startTime}
                      onChange={(e) =>
                        setNewSession({
                          ...newSession,
                          startTime: e.target.value,
                        })
                      }
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      End Time
                    </label>
                    <input
                      type="datetime-local"
                      value={newSession.endTime}
                      onChange={(e) =>
                        setNewSession({
                          ...newSession,
                          endTime: e.target.value,
                        })
                      }
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newSession.location}
                    onChange={(e) =>
                      setNewSession({ ...newSession, location: e.target.value })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Session Type
                  </label>
                  <select
                    value={newSession.type}
                    onChange={(e) =>
                      setNewSession({
                        ...newSession,
                        type: e.target.value as Session["type"],
                      })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  >
                    {sessionTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={newSession.capacity}
                    onChange={(e) =>
                      setNewSession({
                        ...newSession,
                        capacity: parseInt(e.target.value),
                      })
                    }
                    min="0"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsAddingSession(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddSession}
                    disabled={
                      !newSession.title ||
                      !newSession.startTime ||
                      !newSession.endTime
                    }
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Session
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {session.title}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getSessionTypeColor(
                            session.type
                          )}`}
                        >
                          {session.type.charAt(0).toUpperCase() +
                            session.type.slice(1)}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {formatTime(session.startTime)} -{" "}
                          {formatTime(session.endTime)}
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          {session.location}
                        </div>
                        <div className="flex items-center">
                          <UserGroupIcon className="w-4 h-4 mr-1" />
                          {session.registeredAttendees}/{session.capacity}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleSessionExpansion(session.id)}
                        className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        {expandedSessions.has(session.id) ? (
                          <ChevronUpIcon className="w-5 h-5" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setEditingSession(session.id);
                          setNewSession({
                            title: session.title,
                            description: session.description,
                            startTime: session.startTime,
                            endTime: session.endTime,
                            location: session.location,
                            speakers: session.speakers,
                            capacity: session.capacity,
                            type: session.type,
                            tags: session.tags,
                          });
                        }}
                        className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSession(session.id)}
                        className="p-1 text-red-500 hover:text-red-700 dark:hover:text-red-400"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {expandedSessions.has(session.id) && (
                    <div className="mt-4 space-y-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {session.description}
                      </p>

                      {session.speakers.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Speakers
                          </h4>
                          <div className="space-y-2">
                            {session.speakers.map((speaker) => (
                              <div
                                key={speaker.id}
                                className="flex items-center space-x-3"
                              >
                                {speaker.avatar ? (
                                  <img
                                    src={speaker.avatar}
                                    alt={speaker.name}
                                    className="w-8 h-8 rounded-full"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                    <UserGroupIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                  </div>
                                )}
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {speaker.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {speaker.role}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {session.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {session.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {editingSession === session.id && (
                    <div className="mt-4 space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Session Title
                        </label>
                        <input
                          type="text"
                          value={newSession.title}
                          onChange={(e) =>
                            setNewSession({
                              ...newSession,
                              title: e.target.value,
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
                          value={newSession.description}
                          onChange={(e) =>
                            setNewSession({
                              ...newSession,
                              description: e.target.value,
                            })
                          }
                          rows={3}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Start Time
                          </label>
                          <input
                            type="datetime-local"
                            value={newSession.startTime}
                            onChange={(e) =>
                              setNewSession({
                                ...newSession,
                                startTime: e.target.value,
                              })
                            }
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            End Time
                          </label>
                          <input
                            type="datetime-local"
                            value={newSession.endTime}
                            onChange={(e) =>
                              setNewSession({
                                ...newSession,
                                endTime: e.target.value,
                              })
                            }
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={newSession.location}
                          onChange={(e) =>
                            setNewSession({
                              ...newSession,
                              location: e.target.value,
                            })
                          }
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Session Type
                        </label>
                        <select
                          value={newSession.type}
                          onChange={(e) =>
                            setNewSession({
                              ...newSession,
                              type: e.target.value as Session["type"],
                            })
                          }
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                        >
                          {sessionTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Capacity
                        </label>
                        <input
                          type="number"
                          value={newSession.capacity}
                          onChange={(e) =>
                            setNewSession({
                              ...newSession,
                              capacity: parseInt(e.target.value),
                            })
                          }
                          min="0"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                        />
                      </div>

                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setEditingSession(null)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdateSession(session.id)}
                          disabled={
                            !newSession.title ||
                            !newSession.startTime ||
                            !newSession.endTime
                          }
                          className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Update Session
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
