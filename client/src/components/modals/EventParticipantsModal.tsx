import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

interface Participant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  role: "attendee" | "speaker" | "organizer" | "volunteer";
  status: "registered" | "checked-in" | "waitlisted" | "cancelled";
  registrationDate: string;
  ticketType: string;
}

interface EventParticipantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  participants: Participant[];
  onUpdateParticipantStatus: (
    participantId: string,
    status: Participant["status"]
  ) => void;
  onRemoveParticipant: (participantId: string) => void;
  onExportParticipants: () => void;
}

export default function EventParticipantsModal({
  isOpen,
  onClose,
  participants,
  onUpdateParticipantStatus,
  onRemoveParticipant,
  onExportParticipants,
}: EventParticipantsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<Participant["role"] | "all">(
    "all"
  );
  const [selectedStatus, setSelectedStatus] = useState<
    Participant["status"] | "all"
  >("all");

  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch =
      participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      selectedRole === "all" || participant.role === selectedRole;
    const matchesStatus =
      selectedStatus === "all" || participant.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: Participant["status"]) => {
    switch (status) {
      case "registered":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "checked-in":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "waitlisted":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getRoleColor = (role: Participant["role"]) => {
    switch (role) {
      case "speaker":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "organizer":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400";
      case "volunteer":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
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

          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4">
            <Dialog.Title className="text-lg font-medium mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <UserGroupIcon className="w-5 h-5 mr-2" />
                Event Participants
              </div>
              <button
                onClick={onExportParticipants}
                className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
              >
                Export List
              </button>
            </Dialog.Title>

            <div className="mb-6 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search participants..."
                      className="w-full pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                    />
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FunnelIcon className="w-5 h-5 text-gray-400" />
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as any)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  >
                    <option value="all">All Roles</option>
                    <option value="attendee">Attendee</option>
                    <option value="speaker">Speaker</option>
                    <option value="organizer">Organizer</option>
                    <option value="volunteer">Volunteer</option>
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as any)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  >
                    <option value="all">All Status</option>
                    <option value="registered">Registered</option>
                    <option value="checked-in">Checked In</option>
                    <option value="waitlisted">Waitlisted</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Total Participants: {filteredParticipants.length}</span>
                <div className="flex items-center space-x-4">
                  <span>
                    Checked In:{" "}
                    {
                      filteredParticipants.filter(
                        (p) => p.status === "checked-in"
                      ).length
                    }
                  </span>
                  <span>
                    Waitlisted:{" "}
                    {
                      filteredParticipants.filter(
                        (p) => p.status === "waitlisted"
                      ).length
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Participant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Ticket Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Registration Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredParticipants.map((participant) => (
                    <tr key={participant.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {participant.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {participant.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center">
                                <EnvelopeIcon className="w-4 h-4 mr-1" />
                                {participant.email}
                              </div>
                              {participant.phone && (
                                <div className="flex items-center mt-1">
                                  <PhoneIcon className="w-4 h-4 mr-1" />
                                  {participant.phone}
                                </div>
                              )}
                              {participant.location && (
                                <div className="flex items-center mt-1">
                                  <MapPinIcon className="w-4 h-4 mr-1" />
                                  {participant.location}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(
                            participant.role
                          )}`}
                        >
                          {participant.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={participant.status}
                          onChange={(e) =>
                            onUpdateParticipantStatus(
                              participant.id,
                              e.target.value as Participant["status"]
                            )
                          }
                          className={`text-sm rounded-full px-2 py-1 font-semibold ${getStatusColor(
                            participant.status
                          )}`}
                        >
                          <option value="registered">Registered</option>
                          <option value="checked-in">Checked In</option>
                          <option value="waitlisted">Waitlisted</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {participant.ticketType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(
                          participant.registrationDate
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => onRemoveParticipant(participant.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
