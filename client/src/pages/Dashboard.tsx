import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Helper functions for localStorage
const getUser = () =>
  JSON.parse(localStorage.getItem("eventsyncai_signup") || "{}");
const getEvents = () =>
  JSON.parse(localStorage.getItem("eventsyncai_events") || "[]");
const getJoined = () =>
  JSON.parse(localStorage.getItem("eventsyncai_joined") || "[]");
const getReminders = () =>
  JSON.parse(localStorage.getItem("eventsyncai_reminders") || "[]");
const getDark = () =>
  JSON.parse(localStorage.getItem("eventsyncai_darkmode") || "false");

const setEvents = (events: any) =>
  localStorage.setItem("eventsyncai_events", JSON.stringify(events));
const setJoined = (joined: any) =>
  localStorage.setItem("eventsyncai_joined", JSON.stringify(joined));
const setReminders = (reminders: any) =>
  localStorage.setItem("eventsyncai_reminders", JSON.stringify(reminders));
const setDark = (val: boolean) =>
  localStorage.setItem("eventsyncai_darkmode", JSON.stringify(val));

const publicEvents = [
  {
    code: "EVENT123",
    title: "Global Tech Webinar",
    date: "2025-06-20T18:00",
    platform: "Zoom",
  },
  {
    code: "MAGIC2025",
    title: "Tech Summit",
    date: "2025-06-25T15:00",
    platform: "Google Meet",
  },
];

const aiSuggestions = [
  {
    title: "Tech Summit - June 25, 2025 🌟",
    date: "2025-06-25T15:00",
    platform: "Google Meet",
  },
  {
    title: "AI Expo - July 2, 2025 🤖",
    date: "2025-07-02T17:00",
    platform: "Teams",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());
  const [events, setEventsState] = useState(getEvents());
  const [joined, setJoinedState] = useState(getJoined());
  const [reminders, setRemindersState] = useState(getReminders());
  const [dark, setDarkState] = useState(getDark());
  const [hostForm, setHostForm] = useState({
    title: "",
    date: "",
    desc: "",
    participants: "",
    platform: "",
  });
  const [joinCode, setJoinCode] = useState("");
  const [joinDropdown, setJoinDropdown] = useState("");
  const [hostSuccess, setHostSuccess] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      from: "ai",
      text: "Hi! I'm your EventSync AI Agent. How can I help you today?",
    },
  ]);

  // Dark mode effect
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    setDark(dark);
  }, [dark]);

  // Persist events/joined/reminders
  useEffect(() => {
    setEvents(events);
  }, [events]);
  useEffect(() => {
    setJoined(joined);
  }, [joined]);
  useEffect(() => {
    setReminders(reminders);
  }, [reminders]);

  // Host event
  const handleHost = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = {
      ...hostForm,
      code: Math.random().toString(36).substr(2, 8).toUpperCase(),
      host: user.name,
      date: hostForm.date,
    };
    setEventsState([...events, newEvent]);
    setHostForm({
      title: "",
      date: "",
      desc: "",
      participants: "",
      platform: "",
    });
    setHostSuccess(true);
    setTimeout(() => setHostSuccess(false), 2000);
    // Add reminder
    setRemindersState([
      ...reminders,
      {
        event: newEvent.title,
        time: newEvent.date,
        msg: `Reminder: ${newEvent.title} in 24 hours!`,
      },
    ]);
  };

  // Join event
  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    let event =
      events.find((ev: any) => ev.code === joinCode) ||
      publicEvents.find((ev) => ev.code === joinDropdown);
    if (event && !joined.some((j: any) => j.code === event.code)) {
      setJoinedState([...joined, { ...event, rsvp: "Yes" }]);
      setJoinSuccess(true);
      setTimeout(() => setJoinSuccess(false), 2000);
    }
    setJoinCode("");
    setJoinDropdown("");
  };

  // Leave event
  const handleLeave = (code: string) => {
    setJoinedState(joined.filter((ev: any) => ev.code !== code));
  };

  // Share event (simulate)
  const handleShare = (title: string) => {
    navigator.clipboard.writeText(`Join my event: ${title}!`);
    alert("Invite link copied!");
  };

  // Chat AI
  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    let response = "";
    if (/next event/i.test(chatInput)) {
      const next = joined[0];
      response = next
        ? `Your next event is ${next.title} on ${new Date(
            next.date
          ).toLocaleString()}! ⏰`
        : "You have no upcoming events.";
    } else if (/reminder/i.test(chatInput)) {
      response = reminders[0] ? reminders[0].msg : "No reminders set.";
    } else {
      response = "I'm here to help you with your events!";
    }
    setChatHistory([
      ...chatHistory,
      { from: "user", text: chatInput },
      { from: "ai", text: response },
    ]);
    setChatInput("");
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("eventsyncai_signup");
    navigate("/signin");
  };

  // Filtered events
  const filteredJoined = joined.filter(
    (ev: any) =>
      (!search || ev.title.toLowerCase().includes(search.toLowerCase())) &&
      (!filter || ev.rsvp === filter)
  );

  return (
    <div
      className={`min-h-screen w-full ${
        dark ? "bg-gray-900" : "bg-blue-50"
      } transition-colors duration-700`}
    >
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to shadow-lg flex items-center justify-between px-6 py-4">
        <h1 className="text-3xl font-extrabold text-white drop-shadow-lg flex items-center">
          EventSync AI Dashboard{" "}
          <span className="ml-2 animate-pulse">🌟📅</span>
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-lg text-gold-400 font-semibold">
            Welcome, {user.name}! 👤
          </span>
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 bg-brand-gradient-from text-white rounded-lg shadow-lg hover:shadow-gold-400/60 hover:bg-brand-gradient-to transition-all font-bold border-2 border-brand-gradient-to glow-gold"
          >
            Logout 🚪
          </button>
          <button
            onClick={() => setDarkState(!dark)}
            className="ml-2 px-3 py-2 rounded-full bg-gray-800 text-brand-gradient-from border border-brand-gradient-to shadow-lg hover:bg-gray-900 transition-all font-bold focus:outline-none"
          >
            {dark ? "🌙" : "☀️"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-8 px-2 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Host Event */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-blue-200 dark:border-blue-700 relative overflow-hidden"
        >
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-200 mb-4 flex items-center">
            Host an Event 📅
          </h2>
          <form onSubmit={handleHost} className="space-y-3">
            <input
              required
              className="w-full p-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-gold-400 bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-white transition-all"
              placeholder="Event Title 🏷️"
              value={hostForm.title}
              onChange={(e) =>
                setHostForm({ ...hostForm, title: e.target.value })
              }
            />
            <input
              required
              type="datetime-local"
              className="w-full p-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-gold-400 bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-white transition-all"
              value={hostForm.date}
              onChange={(e) =>
                setHostForm({ ...hostForm, date: e.target.value })
              }
            />
            <input
              required
              className="w-full p-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-gold-400 bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-white transition-all"
              placeholder="Description 📝"
              value={hostForm.desc}
              onChange={(e) =>
                setHostForm({ ...hostForm, desc: e.target.value })
              }
            />
            <input
              className="w-full p-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-gold-400 bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-white transition-all"
              placeholder="Participants 🤝 (comma separated)"
              value={hostForm.participants}
              onChange={(e) =>
                setHostForm({ ...hostForm, participants: e.target.value })
              }
            />
            <input
              className="w-full p-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-gold-400 bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-white transition-all"
              placeholder="Platform 🔗 (e.g., Zoom)"
              value={hostForm.platform}
              onChange={(e) =>
                setHostForm({ ...hostForm, platform: e.target.value })
              }
            />
            <motion.button
              whileTap={{ scale: 1.1, boxShadow: "0 0 16px 4px #FFD700" }}
              className="w-full py-2 mt-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all border-2 border-gold-400 relative overflow-hidden sparkle-btn"
            >
              Create Event 🎉
            </motion.button>
            <AnimatePresence>
              {hostSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gold-400 text-center font-bold animate-bounce"
                >
                  Event created! 🎉
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.section>

        {/* Join Event */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-blue-200 dark:border-blue-700 relative overflow-hidden"
        >
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-200 mb-4 flex items-center">
            Join an Event 🔗
          </h2>
          <form onSubmit={handleJoin} className="space-y-3">
            <input
              className="w-full p-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-gold-400 bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-white transition-all"
              placeholder="Event Code 🆔"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
            />
            <select
              className="w-full p-2 rounded-lg border border-blue-300 bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-white"
              value={joinDropdown}
              onChange={(e) => setJoinDropdown(e.target.value)}
            >
              <option value="">Or select a public event</option>
              {publicEvents.map((ev) => (
                <option key={ev.code} value={ev.code}>
                  {ev.title} - {new Date(ev.date).toLocaleString()}
                </option>
              ))}
            </select>
            <motion.button
              whileTap={{ scale: 1.1, boxShadow: "0 0 16px 4px #22c55e" }}
              className="w-full py-2 mt-2 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition-all border-2 border-green-300 animate-pulse"
            >
              Join Event 🚀
            </motion.button>
            <AnimatePresence>
              {joinSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-green-500 text-center font-bold animate-bounce"
                >
                  Joined event! 🚀
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.section>

        {/* Reminders & Suggestions */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-1 flex flex-col gap-6"
        >
          {/* Reminders */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-blue-200 dark:border-blue-700 mb-4">
            <h2 className="text-lg font-bold text-blue-700 dark:text-blue-200 mb-2 flex items-center">
              Upcoming Reminders 🔔
            </h2>
            {reminders.length === 0 ? (
              <div className="text-gray-400">No reminders yet.</div>
            ) : (
              reminders.map((rem, i) => (
                <div
                  key={i}
                  className="bg-blue-50 dark:bg-gray-900 border-l-4 border-gold-400 p-2 my-2 rounded shadow-sm text-blue-900 dark:text-white animate-fade-in"
                >
                  {rem.msg}
                </div>
              ))
            )}
          </div>
          {/* Suggestions */}
          <div className="bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-2xl shadow-xl p-6 border-2 border-gold-400 mb-4">
            <h2 className="text-lg font-bold text-gold-400 mb-2 flex items-center">
              Event Suggestions 💡
            </h2>
            {aiSuggestions.map((ev, i) => (
              <div
                key={i}
                className="text-blue-900 dark:text-white font-semibold mb-1 flex items-center"
              >
                <span className="mr-2">✨</span>
                {ev.title}
              </div>
            ))}
          </div>
          {/* Analytics */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-blue-200 dark:border-blue-700">
            <h2 className="text-lg font-bold text-blue-700 dark:text-blue-200 mb-2 flex items-center">
              Event Analytics 📊
            </h2>
            <div className="text-blue-900 dark:text-white font-semibold">
              You've attended {joined.length} events this month! 📈
            </div>
          </div>
        </motion.section>
      </main>

      {/* Filters & Search */}
      <section className="max-w-6xl mx-auto px-2 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <input
            className="w-full md:w-1/2 p-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-gold-400 bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-white transition-all"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="w-full md:w-1/4 p-2 rounded-lg border border-blue-300 bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Yes">RSVP Yes</option>
            <option value="No">RSVP No</option>
          </select>
        </div>
        {/* Joined Events List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJoined.length === 0 ? (
            <div className="text-gray-400">No joined events.</div>
          ) : (
            filteredJoined.map((ev: any, i: number) => (
              <motion.div
                key={ev.code}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-blue-200 dark:border-blue-700 mb-2 flex flex-col gap-2 hover:shadow-gold-400/60 transition-all group relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-blue-700 dark:text-blue-200 flex items-center">
                      {ev.title} 🏷️
                    </div>
                    <div className="text-sm text-blue-500 dark:text-blue-300">
                      {new Date(ev.date).toLocaleString()} ⏰
                    </div>
                    <div className="text-sm text-blue-500 dark:text-blue-300">
                      {ev.platform} 🔗
                    </div>
                    <div className="text-sm text-blue-500 dark:text-blue-300">
                      RSVP: {ev.rsvp || "Yes"} ✅
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <button
                      onClick={() => alert(JSON.stringify(ev, null, 2))}
                      className="text-blue-600 dark:text-blue-200 underline hover:text-gold-400 transition-all"
                    >
                      View Details 👀
                    </button>
                    <button
                      onClick={() => handleLeave(ev.code)}
                      className="text-red-500 hover:text-red-700 transition-all fade-out"
                    >
                      Leave Event 🚪
                    </button>
                    <button
                      onClick={() => handleShare(ev.title)}
                      className="text-green-500 hover:scale-110 transition-transform"
                    >
                      Share Invite 📧
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Floating Chat Bubble */}
      <motion.button
        onClick={() => setShowChat(true)}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white rounded-full p-4 shadow-lg border-4 border-gold-400 animate-pulse hover:scale-110 transition-transform"
      >
        🤖
      </motion.button>
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-8 z-50 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-blue-400 p-4 flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold text-blue-700 dark:text-blue-200">
                EventSync AI Chat 🤖
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-red-500 font-bold"
              >
                ✖
              </button>
            </div>
            <div className="flex-1 overflow-y-auto mb-2 max-h-60">
              {chatHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`my-1 ${
                    msg.from === "ai"
                      ? "text-blue-700 dark:text-blue-200"
                      : "text-gray-700 dark:text-white text-right"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleChat} className="flex gap-2">
              <input
                className="flex-1 p-2 rounded-lg border border-blue-300 bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-white"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me anything..."
              />
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Magical Sparkle Animation (CSS) */}
      <style>{`
        .glow-gold { box-shadow: 0 0 8px 2px #FFD700, 0 0 16px 4px #FFD70044; }
        .sparkle-btn::after {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          background: repeating-linear-gradient(135deg, #FFD70044 0 2px, transparent 2px 8px);
          opacity: 0.5; z-index: 1;
          animation: sparkle 2s linear infinite;
        }
        @keyframes sparkle {
          0% { background-position: 0 0; }
          100% { background-position: 100px 100px; }
        }
        .animate-fade-in { animation: fadeIn 1s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-out { transition: opacity 0.5s; }
        .fade-out:active { opacity: 0.5; }
      `}</style>
    </div>
  );
};

export default Dashboard;
