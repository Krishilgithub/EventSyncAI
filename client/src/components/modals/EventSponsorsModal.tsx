import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import {
  BuildingOfficeIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  tier: "platinum" | "gold" | "silver" | "bronze";
  description: string;
  benefits: string[];
}

interface EventSponsorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sponsors: Sponsor[];
  onAddSponsor: (sponsor: Omit<Sponsor, "id">) => void;
  onUpdateSponsor: (sponsor: Sponsor) => void;
  onDeleteSponsor: (sponsorId: string) => void;
}

export default function EventSponsorsModal({
  isOpen,
  onClose,
  sponsors,
  onAddSponsor,
  onUpdateSponsor,
  onDeleteSponsor,
}: EventSponsorsModalProps) {
  const [isAddingSponsor, setIsAddingSponsor] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [newSponsor, setNewSponsor] = useState<Omit<Sponsor, "id">>({
    name: "",
    logo: "",
    website: "",
    tier: "bronze",
    description: "",
    benefits: [],
  });
  const [newBenefit, setNewBenefit] = useState("");

  const handleAddSponsor = () => {
    if (newSponsor.name && newSponsor.logo) {
      onAddSponsor(newSponsor);
      setNewSponsor({
        name: "",
        logo: "",
        website: "",
        tier: "bronze",
        description: "",
        benefits: [],
      });
      setIsAddingSponsor(false);
    }
  };

  const handleUpdateSponsor = () => {
    if (editingSponsor) {
      onUpdateSponsor(editingSponsor);
      setEditingSponsor(null);
    }
  };

  const handleAddBenefit = (sponsor: Sponsor | Omit<Sponsor, "id">) => {
    if (newBenefit.trim()) {
      if ("id" in sponsor) {
        setEditingSponsor({
          ...sponsor,
          benefits: [...sponsor.benefits, newBenefit.trim()],
        });
      } else {
        setNewSponsor({
          ...sponsor,
          benefits: [...sponsor.benefits, newBenefit.trim()],
        });
      }
      setNewBenefit("");
    }
  };

  const handleRemoveBenefit = (
    sponsor: Sponsor | Omit<Sponsor, "id">,
    benefitIndex: number
  ) => {
    if ("id" in sponsor) {
      setEditingSponsor({
        ...sponsor,
        benefits: sponsor.benefits.filter((_, index) => index !== benefitIndex),
      });
    } else {
      setNewSponsor({
        ...sponsor,
        benefits: sponsor.benefits.filter((_, index) => index !== benefitIndex),
      });
    }
  };

  const getTierColor = (tier: Sponsor["tier"]) => {
    switch (tier) {
      case "platinum":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "gold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "silver":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "bronze":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
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
                <BuildingOfficeIcon className="w-5 h-5 mr-2" />
                Event Sponsors
              </div>
              <button
                onClick={() => setIsAddingSponsor(true)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </Dialog.Title>

            {(isAddingSponsor || editingSponsor) && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sponsor Name
                  </label>
                  <input
                    type="text"
                    value={editingSponsor?.name || newSponsor.name}
                    onChange={(e) =>
                      editingSponsor
                        ? setEditingSponsor({
                            ...editingSponsor,
                            name: e.target.value,
                          })
                        : setNewSponsor({ ...newSponsor, name: e.target.value })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="text"
                    value={editingSponsor?.logo || newSponsor.logo}
                    onChange={(e) =>
                      editingSponsor
                        ? setEditingSponsor({
                            ...editingSponsor,
                            logo: e.target.value,
                          })
                        : setNewSponsor({ ...newSponsor, logo: e.target.value })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={editingSponsor?.website || newSponsor.website}
                    onChange={(e) =>
                      editingSponsor
                        ? setEditingSponsor({
                            ...editingSponsor,
                            website: e.target.value,
                          })
                        : setNewSponsor({
                            ...newSponsor,
                            website: e.target.value,
                          })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tier
                  </label>
                  <select
                    value={editingSponsor?.tier || newSponsor.tier}
                    onChange={(e) =>
                      editingSponsor
                        ? setEditingSponsor({
                            ...editingSponsor,
                            tier: e.target.value as Sponsor["tier"],
                          })
                        : setNewSponsor({
                            ...newSponsor,
                            tier: e.target.value as Sponsor["tier"],
                          })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  >
                    <option value="platinum">Platinum</option>
                    <option value="gold">Gold</option>
                    <option value="silver">Silver</option>
                    <option value="bronze">Bronze</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={
                      editingSponsor?.description || newSponsor.description
                    }
                    onChange={(e) =>
                      editingSponsor
                        ? setEditingSponsor({
                            ...editingSponsor,
                            description: e.target.value,
                          })
                        : setNewSponsor({
                            ...newSponsor,
                            description: e.target.value,
                          })
                    }
                    rows={3}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Benefits
                  </label>
                  <div className="space-y-2">
                    {(editingSponsor?.benefits || newSponsor.benefits).map(
                      (benefit, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md"
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {benefit}
                          </span>
                          <button
                            onClick={() =>
                              handleRemoveBenefit(
                                editingSponsor || newSponsor,
                                index
                              )
                            }
                            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      )
                    )}
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newBenefit}
                        onChange={(e) => setNewBenefit(e.target.value)}
                        placeholder="Add a benefit..."
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                      />
                      <button
                        onClick={() =>
                          handleAddBenefit(editingSponsor || newSponsor)
                        }
                        className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setIsAddingSponsor(false);
                      setEditingSponsor(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={
                      editingSponsor ? handleUpdateSponsor : handleAddSponsor
                    }
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
                  >
                    {editingSponsor ? "Save Changes" : "Add Sponsor"}
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="w-12 h-12 object-contain"
                      />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {sponsor.name}
                        </h3>
                        <span
                          className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTierColor(
                            sponsor.tier
                          )}`}
                        >
                          {sponsor.tier}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingSponsor(sponsor)}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDeleteSponsor(sponsor.id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {sponsor.description}
                  </p>

                  {sponsor.website && (
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-brand-gradient-from hover:text-brand-gradient-to"
                    >
                      <LinkIcon className="w-4 h-4 mr-1" />
                      Visit Website
                    </a>
                  )}

                  {sponsor.benefits.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Benefits
                      </h4>
                      <ul className="space-y-1">
                        {sponsor.benefits.map((benefit, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-500 dark:text-gray-400"
                          >
                            • {benefit}
                          </li>
                        ))}
                      </ul>
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
