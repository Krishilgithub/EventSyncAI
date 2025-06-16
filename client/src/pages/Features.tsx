import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "Event Scheduling",
    description:
      "AI-powered scheduling that finds the perfect time for all participants",
    icon: "📅",
    details: [
      "Smart time slot suggestions",
      "Calendar integration",
      "Conflict resolution",
      "Recurring event support",
    ],
  },
  {
    title: "Reminders",
    description:
      "Automated notifications and follow-ups to keep everyone on track",
    icon: "🔔",
    details: [
      "Customizable templates",
      "Multi-channel notifications",
      "Smart timing",
      "RSVP tracking",
    ],
  },
  {
    title: "Participant Coordination",
    description: "Efficiently manage attendees and their roles",
    icon: "👥",
    details: [
      "Role-based access",
      "Group management",
      "Communication tools",
      "Attendance tracking",
    ],
  },
  {
    title: "Calendar Sync",
    description: "Seamless integration with popular calendar platforms",
    icon: "📆",
    details: ["Google Calendar", "Outlook", "iCal", "Two-way sync"],
  },
  {
    title: "Communication",
    description: "Built-in tools for effective event communication",
    icon: "💬",
    details: [
      "In-app messaging",
      "Email templates",
      "Announcements",
      "Q&A sessions",
    ],
  },
  {
    title: "Task Tracking",
    description: "Keep track of event-related tasks and deadlines",
    icon: "✅",
    details: [
      "Task assignment",
      "Progress tracking",
      "Deadline reminders",
      "Collaboration tools",
    ],
  },
  {
    title: "Virtual Meetings",
    description: "Integrated video conferencing and meeting tools",
    icon: "🎥",
    details: [
      "Zoom integration",
      "Google Meet support",
      "Recording options",
      "Screen sharing",
    ],
  },
  {
    title: "Analytics",
    description: "Comprehensive insights and reporting",
    icon: "📊",
    details: [
      "Attendance metrics",
      "Engagement tracking",
      "Feedback analysis",
      "Custom reports",
    ],
  },
  {
    title: "User Roles",
    description: "Flexible permission system for different user types",
    icon: "👤",
    details: [
      "Admin controls",
      "Organizer features",
      "Attendee access",
      "Custom roles",
    ],
  },
  {
    title: "AI Suggestions",
    description: "Intelligent recommendations for better events",
    icon: "🤖",
    details: [
      "Best time suggestions",
      "Content recommendations",
      "Format optimization",
      "Participant insights",
    ],
  },
];

const FeatureCard = ({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card hover-tilt"
    >
      <div className="text-4xl mb-4">{feature.icon}</div>
      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
      <p className="text-gray-600 mb-4">{feature.description}</p>
      <ul className="space-y-2">
        {feature.details.map((detail, i) => (
          <li key={i} className="flex items-center text-gray-600">
            <span className="mr-2">•</span>
            {detail}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Features = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold text-dark mb-4"
          >
            Powerful Features
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Everything you need to plan, manage, and host successful virtual
            events
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-dark mb-4">
            Ready to Transform Your Events?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start using EventSync Pro today and experience the future of event
            management
          </p>
          <a href="/dashboard" className="btn btn-primary inline-block">
            Get Started Now
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
