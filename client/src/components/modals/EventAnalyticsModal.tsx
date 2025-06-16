import { Dialog, Transition } from "@headlessui/react";
import {
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  TicketIcon,
  MapPinIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnalyticsData {
  totalRegistrations: number;
  totalRevenue: number;
  ticketsSold: number;
  averageTicketPrice: number;
  registrationTrend: {
    date: string;
    count: number;
  }[];
  ticketTypeDistribution: {
    type: string;
    count: number;
    revenue: number;
  }[];
  topLocations: {
    location: string;
    count: number;
  }[];
  demographics: {
    ageGroups: {
      range: string;
      count: number;
    }[];
    genderDistribution: {
      gender: string;
      count: number;
    }[];
    organizationTypes: {
      type: string;
      count: number;
    }[];
  };
}

interface EventAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  analytics: AnalyticsData;
  dateRange: {
    start: string;
    end: string;
  };
}

export default function EventAnalyticsModal({
  isOpen,
  onClose,
  eventName,
  analytics,
  dateRange,
}: EventAnalyticsModalProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
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

          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-6xl w-full mx-4">
            <Dialog.Title className="text-lg font-medium mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <ChartBarIcon className="w-5 h-5 mr-2" />
                Analytics for {eventName}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
              </div>
            </Dialog.Title>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Registrations
                    </p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {analytics.totalRegistrations}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                    <UserGroupIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500">+12% from last period</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(analytics.totalRevenue)}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                    <CurrencyDollarIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500">+8% from last period</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Tickets Sold
                    </p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {analytics.ticketsSold}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                    <TicketIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <ArrowTrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-red-500">-3% from last period</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Average Ticket Price
                    </p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(analytics.averageTicketPrice)}
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                    <CurrencyDollarIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500">+5% from last period</span>
                </div>
              </div>
            </div>

            {/* Registration Trend */}
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Registration Trend
              </h3>
              <div className="h-64">
                {/* Add your chart component here */}
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  Chart visualization will be added here
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Ticket Type Distribution */}
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Ticket Type Distribution
                </h3>
                <div className="space-y-4">
                  {analytics.ticketTypeDistribution.map((type) => (
                    <div key={type.type}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {type.type}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatCurrency(type.revenue)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-brand-gradient-from h-2 rounded-full"
                          style={{
                            width: `${
                              (type.count / analytics.ticketsSold) * 100
                            }%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {type.count} tickets
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {((type.count / analytics.ticketsSold) * 100).toFixed(
                            1
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Locations */}
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Top Locations
                </h3>
                <div className="space-y-4">
                  {analytics.topLocations.map((location) => (
                    <div
                      key={location.location}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <MapPinIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {location.location}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {location.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demographics */}
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Age Distribution
                </h3>
                <div className="space-y-4">
                  {analytics.demographics.ageGroups.map((group) => (
                    <div key={group.range}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {group.range}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {group.count}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-brand-gradient-from h-2 rounded-full"
                          style={{
                            width: `${
                              (group.count / analytics.totalRegistrations) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Organization Types */}
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Organization Types
                </h3>
                <div className="space-y-4">
                  {analytics.demographics.organizationTypes.map((org) => (
                    <div key={org.type}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {org.type}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {org.count}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-brand-gradient-from h-2 rounded-full"
                          style={{
                            width: `${
                              (org.count / analytics.totalRegistrations) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
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
