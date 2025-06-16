import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import {
  UserGroupIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

interface Team {
  name: string;
  members: string[];
}

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  onAddTeam: (team: Team) => void;
  onEditTeam: (index: number, team: Team) => void;
  onDeleteTeam: (index: number) => void;
  onInviteToTeam: (teamIndex: number) => void;
}

export default function TeamModal({
  isOpen,
  onClose,
  teams,
  onAddTeam,
  onEditTeam,
  onDeleteTeam,
  onInviteToTeam,
}: TeamModalProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Team>({
    name: "",
    members: [],
  });
  const [newMember, setNewMember] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      onEditTeam(editingIndex, formData);
      setEditingIndex(null);
    } else {
      onAddTeam(formData);
    }
    setFormData({
      name: "",
      members: [],
    });
    setIsAdding(false);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(teams[index]);
    setIsAdding(true);
  };

  const handleAddMember = () => {
    if (newMember.trim()) {
      setFormData({
        ...formData,
        members: [...formData.members, newMember.trim()],
      });
      setNewMember("");
    }
  };

  const handleRemoveMember = (index: number) => {
    setFormData({
      ...formData,
      members: formData.members.filter((_, i) => i !== index),
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

          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <Dialog.Title className="text-lg font-medium mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <UserGroupIcon className="w-5 h-5 mr-2" />
                Team Collaboration
              </div>
              <button
                onClick={() => setIsAdding(true)}
                className="p-2 text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-lg"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </Dialog.Title>

            {isAdding ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Team Members
                  </label>
                  <div className="mt-1 flex space-x-2">
                    <input
                      type="text"
                      value={newMember}
                      onChange={(e) => setNewMember(e.target.value)}
                      placeholder="Add member email"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                    />
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="px-3 py-2 text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {formData.members.length > 0 && (
                  <div className="space-y-2">
                    {formData.members.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md"
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {member}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setEditingIndex(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
                  >
                    {editingIndex !== null ? "Save Changes" : "Create Team"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {teams.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    No teams yet
                  </p>
                ) : (
                  teams.map((team, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {team.name}
                          </h4>
                          <div className="mt-2 space-y-1">
                            {team.members.map((member, memberIndex) => (
                              <p
                                key={memberIndex}
                                className="text-sm text-gray-500 dark:text-gray-400"
                              >
                                {member}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(index)}
                            className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteTeam(index)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => onInviteToTeam(index)}
                        className="mt-2 w-full px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md flex items-center justify-center"
                      >
                        <UserPlusIcon className="w-4 h-4 mr-2" />
                        Invite to Team
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {!isAdding && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
