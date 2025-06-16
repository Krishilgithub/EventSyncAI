import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import {
  UserGroupIcon,
  UserPlusIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member" | "viewer";
  avatar: string;
}

interface TeamManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTeam: (team: TeamMember[]) => void;
  initialTeam: TeamMember[];
}

export default function TeamManagementModal({
  isOpen,
  onClose,
  onSaveTeam,
  initialTeam,
}: TeamManagementModalProps) {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "member" as const,
  });

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      const member: TeamMember = {
        id: Date.now().toString(),
        name: newMember.name,
        email: newMember.email,
        role: newMember.role,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          newMember.name
        )}`,
      };
      setTeam((prev) => [...prev, member]);
      setNewMember({ name: "", email: "", role: "member" });
      setIsAddingMember(false);
    }
  };

  const handleRemoveMember = (id: string) => {
    setTeam((prev) => prev.filter((member) => member.id !== id));
  };

  const handleRoleChange = (
    id: string,
    role: "admin" | "member" | "viewer"
  ) => {
    setTeam((prev) =>
      prev.map((member) => (member.id === id ? { ...member, role } : member))
    );
  };

  const handleSave = () => {
    onSaveTeam(team);
    onClose();
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
                Team Management
              </div>
              <button
                onClick={() => setIsAddingMember(true)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <UserPlusIcon className="w-5 h-5" />
              </button>
            </Dialog.Title>

            {isAddingMember ? (
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) =>
                      setNewMember((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newMember.email}
                    onChange={(e) =>
                      setNewMember((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Role
                  </label>
                  <select
                    value={newMember.role}
                    onChange={(e) =>
                      setNewMember((prev) => ({
                        ...prev,
                        role: e.target.value as "admin" | "member" | "viewer",
                      }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  >
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsAddingMember(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMember}
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
                  >
                    Add Member
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {team.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {member.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <select
                        value={member.role}
                        onChange={(e) =>
                          handleRoleChange(
                            member.id,
                            e.target.value as "admin" | "member" | "viewer"
                          )
                        }
                        className="text-sm rounded-md border-gray-300 focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                      >
                        <option value="admin">Admin</option>
                        <option value="member">Member</option>
                        <option value="viewer">Viewer</option>
                      </select>

                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="p-1 text-red-600 hover:text-red-700 dark:hover:text-red-500"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
