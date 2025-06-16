import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  UserCircleIcon,
  BellIcon,
  MoonIcon,
  SunIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  DocumentDuplicateIcon,
  CalendarIcon,
  UserGroupIcon,
  ChartBarIcon,
  BellAlertIcon,
  SwatchIcon,
  QuestionMarkCircleIcon,
  EnvelopeIcon,
  StarIcon,
  TrophyIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

interface UserProfile {
  name: string;
  email: string;
  photo: string;
}

interface NotificationPrefs {
  sms: boolean;
  email: boolean;
}

interface EventHistory {
  title: string;
  date: string;
  attendance: number;
}

interface ChatMessage {
  user: string;
  ai: string;
}

interface EventTemplate {
  title: string;
  participants: string;
  platform: string;
  reminders: boolean;
}

interface Team {
  name: string;
  members: string[];
}

interface Analytics {
  hosted: number;
  avgAttendance: number;
  joined: number;
  rsvpRate: number;
}

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

interface Invitation {
  event: string;
  participant: string;
  status: string;
}

interface Feedback {
  rating: number;
  comment: string;
  date: string;
}

interface Achievement {
  name: string;
  earned: boolean;
}

const SAMPLE_PHOTO = "https://randomuser.me/api/portraits/men/32.jpg";

const MENU_OPTIONS = [
  { key: "profile", label: "Edit Profile", icon: UserCircleIcon },
  { key: "notifications", label: "Notifications", icon: BellIcon },
  { key: "darkmode", label: "Dark Mode", icon: MoonIcon },
  { key: "history", label: "Event History", icon: ClockIcon },
  { key: "ai", label: "Chat with AI", icon: ChatBubbleLeftRightIcon },
  { key: "templates", label: "Event Templates", icon: DocumentDuplicateIcon },
  { key: "calendar", label: "Calendar Integration", icon: CalendarIcon },
  { key: "teams", label: "Team Collaboration", icon: UserGroupIcon },
  { key: "analytics", label: "Analytics Dashboard", icon: ChartBarIcon },
  {
    key: "notifications-center",
    label: "Notifications Center",
    icon: BellAlertIcon,
  },
  { key: "themes", label: "Custom Themes", icon: SwatchIcon },
  { key: "help", label: "Help & Support", icon: QuestionMarkCircleIcon },
  { key: "invitations", label: "Invitations Manager", icon: EnvelopeIcon },
  { key: "feedback", label: "Feedback & Suggestions", icon: StarIcon },
  { key: "achievements", label: "Achievements & Rewards", icon: TrophyIcon },
  { key: "logout", label: "Logout", icon: ArrowRightOnRectangleIcon },
];

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState({
    name: "User Name",
    email: "user@example.com",
    photo: SAMPLE_PHOTO,
  });
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPrefs>(
    {
      sms: true,
      email: false,
    }
  );

  useEffect(() => {
    // Fetch user from signup credentials
    const signup = JSON.parse(
      localStorage.getItem("eventsyncai_signup") || "{}"
    );
    setUserProfile((prev) => ({
      ...prev,
      name: signup.name || prev.name,
      email: signup.email || prev.email,
      photo: prev.photo,
    }));
    // Optionally, fetch photo from localStorage if user uploaded one
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      setUserProfile((prev) => ({ ...prev, ...parsed }));
    }
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) setDarkMode(JSON.parse(storedDarkMode));
  }, []);

  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [userProfile, darkMode]);

  const handleProfileUpdate = (updates: Partial<typeof userProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleProfileUpdate({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotificationToggle = (type: "sms" | "email") => {
    setNotificationPrefs((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-[100] p-2 rounded-full bg-blue-900 text-white hover:scale-110 transition-transform border-2 border-white focus:outline-none shadow-lg"
        aria-label="Open menu"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Sidebar */}
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition-transform duration-300"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-300"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <aside
          className="fixed top-0 left-0 h-full w-64 bg-blue-900 dark:bg-gray-900 shadow-2xl z-[200] overflow-y-auto border-r-4 border-white animate-fadeIn"
          style={{ minHeight: "720px" }}
        >
          {/* Close Button at top-right inside sidebar */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-[300] p-2 rounded-full bg-white text-blue-900 hover:bg-gray-200 transition-colors shadow border-2 border-white"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* User Profile Section */}
          <div className="p-4 pt-20 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <img
                src={userProfile.photo}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {userProfile.name}
                </h3>
                <p className="text-sm text-gray-300">{userProfile.email}</p>
              </div>
            </div>
            <button
              onClick={() => setActiveModal("profile")}
              className="mt-2 w-full px-4 py-2 text-sm text-blue-300 hover:text-white hover:bg-blue-800 rounded transition-colors"
            >
              Edit Profile
            </button>
          </div>

          {/* Menu Items */}
          <nav className="p-4 space-y-1">
            {MENU_OPTIONS.map((option) => (
              <button
                key={option.key}
                onClick={() => {
                  if (option.key === "logout") handleLogout();
                  else if (option.key === "darkmode") handleDarkModeToggle();
                  else setActiveModal(option.key);
                }}
                className={`flex items-center space-x-3 w-full px-4 py-2 rounded-lg transition-colors text-gray-200 hover:bg-blue-800 ${
                  option.key === "logout"
                    ? "text-red-400 hover:bg-red-900/30"
                    : ""
                }`}
              >
                <option.icon className="w-5 h-5" />
                <span className="truncate">{option.label}</span>
              </button>
            ))}
          </nav>
        </aside>
      </Transition>

      {/* Modals - Placeholder for each menu option except logout/darkmode */}
      {MENU_OPTIONS.filter(
        (opt) => !["logout", "darkmode"].includes(opt.key)
      ).map((opt) => (
        <Transition key={opt.key} show={activeModal === opt.key} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-[300] overflow-y-auto"
            onClose={() => setActiveModal(null)}
          >
            <div className="flex items-center justify-center min-h-screen">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
              <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-auto z-50">
                <Dialog.Title className="text-lg font-bold mb-4 text-blue-900 dark:text-white">
                  {opt.label}
                </Dialog.Title>
                {opt.key === "profile" ? (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center">
                      <img
                        src={userProfile.photo}
                        alt="Profile"
                        className="w-20 h-20 rounded-full mb-2"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-900 dark:text-white">
                        Name
                      </label>
                      <input
                        type="text"
                        value={userProfile.name}
                        onChange={(e) =>
                          handleProfileUpdate({ name: e.target.value })
                        }
                        className="w-full rounded border border-gray-300 p-2 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-900 dark:text-white">
                        Email
                      </label>
                      <input
                        type="email"
                        value={userProfile.email}
                        onChange={(e) =>
                          handleProfileUpdate({ email: e.target.value })
                        }
                        className="w-full rounded border border-gray-300 p-2 mt-1"
                      />
                    </div>
                    <button
                      onClick={() => setActiveModal(null)}
                      className="w-full mt-4 py-2 rounded bg-blue-900 text-white font-semibold hover:bg-blue-800 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-700 dark:text-gray-200 text-center py-8">
                    {opt.label} content goes here.
                  </div>
                )}
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-blue-100 text-blue-900 hover:bg-blue-200"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Dialog>
        </Transition>
      ))}
    </>
  );
}
