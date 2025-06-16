import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  TicketIcon,
  CreditCardIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface Ticket {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
  maxPerPerson: number;
}

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  tickets: Ticket[];
  onRegister: (registrationData: {
    ticketId: string;
    quantity: number;
    attendeeInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      organization: string;
      dietaryRestrictions?: string;
      specialRequirements?: string;
    };
    paymentMethod: "card" | "transfer";
  }) => void;
}

export default function EventRegistrationModal({
  isOpen,
  onClose,
  eventName,
  tickets,
  onRegister,
}: EventRegistrationModalProps) {
  const [step, setStep] = useState<
    "tickets" | "info" | "payment" | "confirmation"
  >("tickets");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [attendeeInfo, setAttendeeInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    dietaryRestrictions: "",
    specialRequirements: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">(
    "card"
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setQuantity(1);
    setStep("info");
  };

  const handleInfoSubmit = () => {
    setStep("payment");
  };

  const handlePaymentSubmit = async () => {
    if (!selectedTicket) return;

    setIsProcessing(true);
    try {
      await onRegister({
        ticketId: selectedTicket.id,
        quantity,
        attendeeInfo,
        paymentMethod,
      });
      setStep("confirmation");
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error (show error message, etc.)
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setStep("tickets");
    setSelectedTicket(null);
    setQuantity(1);
    setAttendeeInfo({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      organization: "",
      dietaryRestrictions: "",
      specialRequirements: "",
    });
    setPaymentMethod("card");
    onClose();
  };

  const totalAmount = selectedTicket ? selectedTicket.price * quantity : 0;

  return (
    <Transition show={isOpen}>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
            <Dialog.Title className="text-lg font-medium mb-4 flex items-center">
              <TicketIcon className="w-5 h-5 mr-2" />
              Register for {eventName}
            </Dialog.Title>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {["tickets", "info", "payment", "confirmation"].map((s) => (
                  <div
                    key={s}
                    className={`flex items-center ${
                      s !== "confirmation" ? "flex-1" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step === s
                          ? "bg-brand-gradient-from text-white"
                          : step === "confirmation" && s === "payment"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {step === "confirmation" && s === "payment" ? (
                        <CheckCircleIcon className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-medium">
                          {[
                            "tickets",
                            "info",
                            "payment",
                            "confirmation",
                          ].indexOf(s) + 1}
                        </span>
                      )}
                    </div>
                    {s !== "confirmation" && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          step === "confirmation" && s === "payment"
                            ? "bg-green-500"
                            : step === s || step === "confirmation"
                            ? "bg-brand-gradient-from"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Select Ticket
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Attendee Info
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Payment
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Confirmation
                </span>
              </div>
            </div>

            {/* Ticket Selection */}
            {step === "tickets" && (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-brand-gradient-from dark:hover:border-brand-gradient-to cursor-pointer"
                    onClick={() => handleTicketSelect(ticket)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {ticket.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {ticket.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                          ${ticket.price}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {ticket.available} available
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Attendee Information */}
            {step === "info" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={attendeeInfo.firstName}
                        onChange={(e) =>
                          setAttendeeInfo({
                            ...attendeeInfo,
                            firstName: e.target.value,
                          })
                        }
                        className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={attendeeInfo.lastName}
                        onChange={(e) =>
                          setAttendeeInfo({
                            ...attendeeInfo,
                            lastName: e.target.value,
                          })
                        }
                        className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={attendeeInfo.email}
                      onChange={(e) =>
                        setAttendeeInfo({
                          ...attendeeInfo,
                          email: e.target.value,
                        })
                      }
                      className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={attendeeInfo.phone}
                      onChange={(e) =>
                        setAttendeeInfo({
                          ...attendeeInfo,
                          phone: e.target.value,
                        })
                      }
                      className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Organization
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={attendeeInfo.organization}
                      onChange={(e) =>
                        setAttendeeInfo({
                          ...attendeeInfo,
                          organization: e.target.value,
                        })
                      }
                      className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Dietary Restrictions
                  </label>
                  <textarea
                    value={attendeeInfo.dietaryRestrictions}
                    onChange={(e) =>
                      setAttendeeInfo({
                        ...attendeeInfo,
                        dietaryRestrictions: e.target.value,
                      })
                    }
                    rows={2}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                    placeholder="Please let us know if you have any dietary restrictions..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Special Requirements
                  </label>
                  <textarea
                    value={attendeeInfo.specialRequirements}
                    onChange={(e) =>
                      setAttendeeInfo({
                        ...attendeeInfo,
                        specialRequirements: e.target.value,
                      })
                    }
                    rows={2}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                    placeholder="Please let us know if you have any special requirements..."
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setStep("tickets")}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleInfoSubmit}
                    disabled={
                      !attendeeInfo.firstName ||
                      !attendeeInfo.lastName ||
                      !attendeeInfo.email ||
                      !attendeeInfo.phone ||
                      !attendeeInfo.organization
                    }
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Payment */}
            {step === "payment" && (
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Order Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        {selectedTicket?.name} x {quantity}
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        ${selectedTicket?.price * quantity}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">
                          Total
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${totalAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Payment Method
                  </label>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value as "card" | "transfer"
                          )
                        }
                        className="h-4 w-4 text-brand-gradient-from focus:ring-brand-gradient-from border-gray-300"
                      />
                      <div className="flex items-center">
                        <CreditCardIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Credit Card
                        </span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        value="transfer"
                        checked={paymentMethod === "transfer"}
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value as "card" | "transfer"
                          )
                        }
                        className="h-4 w-4 text-brand-gradient-from focus:ring-brand-gradient-from border-gray-300"
                      />
                      <div className="flex items-center">
                        <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Bank Transfer
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "transfer" && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Bank Account Details
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p>Bank: Example Bank</p>
                      <p>Account Name: Event Name</p>
                      <p>Account Number: 1234567890</p>
                      <p>Reference: Your Name</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setStep("info")}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePaymentSubmit}
                    disabled={isProcessing}
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? "Processing..." : "Complete Registration"}
                  </button>
                </div>
              </div>
            )}

            {/* Confirmation */}
            {step === "confirmation" && (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  Registration Successful!
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Thank you for registering for {eventName}. We've sent a
                  confirmation email to {attendeeInfo.email} with all the
                  details.
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
