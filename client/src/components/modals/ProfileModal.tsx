import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import {
  UserCircleIcon,
  CameraIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (profile: any) => void;
  initialProfile: {
    name: string;
    email: string;
    bio: string;
    avatar: string;
    socialLinks: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  };
}

export default function ProfileModal({
  isOpen,
  onClose,
  onSaveProfile,
  initialProfile,
}: ProfileModalProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "social">("info");

  const handleSave = () => {
    onSaveProfile(profile);
    setIsEditing(false);
    onClose();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
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
                <UserCircleIcon className="w-5 h-5 mr-2" />
                Profile
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
              )}
            </Dialog.Title>

            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setActiveTab("info")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === "info"
                    ? "text-white bg-brand-gradient-from"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Basic Info
              </button>
              <button
                onClick={() => setActiveTab("social")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === "social"
                    ? "text-white bg-brand-gradient-from"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Social Links
              </button>
            </div>

            {activeTab === "info" && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={profile.avatar}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 p-1 bg-white dark:bg-gray-700 rounded-full shadow-lg cursor-pointer">
                        <CameraIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, name: e.target.value }))
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from disabled:bg-gray-100 dark:disabled:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, email: e.target.value }))
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from disabled:bg-gray-100 dark:disabled:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bio
                  </label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    disabled={!isEditing}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from disabled:bg-gray-100 dark:disabled:bg-gray-700"
                  />
                </div>
              </div>
            )}

            {activeTab === "social" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Twitter
                  </label>
                  <input
                    type="text"
                    value={profile.socialLinks.twitter || ""}
                    onChange={(e) =>
                      handleSocialLinkChange("twitter", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="@username"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from disabled:bg-gray-100 dark:disabled:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    value={profile.socialLinks.linkedin || ""}
                    onChange={(e) =>
                      handleSocialLinkChange("linkedin", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="linkedin.com/in/username"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from disabled:bg-gray-100 dark:disabled:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    GitHub
                  </label>
                  <input
                    type="text"
                    value={profile.socialLinks.github || ""}
                    onChange={(e) =>
                      handleSocialLinkChange("github", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="github.com/username"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from disabled:bg-gray-100 dark:disabled:bg-gray-700"
                  />
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
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
                </>
              ) : (
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
