import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import {
  DocumentDuplicateIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

interface EventTemplate {
  title: string;
  participants: string;
  platform: string;
  reminders: boolean;
}

interface EventTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  templates: EventTemplate[];
  onAddTemplate: (template: EventTemplate) => void;
  onEditTemplate: (index: number, template: EventTemplate) => void;
  onDeleteTemplate: (index: number) => void;
  onApplyTemplate: (template: EventTemplate) => void;
}

export default function EventTemplatesModal({
  isOpen,
  onClose,
  templates,
  onAddTemplate,
  onEditTemplate,
  onDeleteTemplate,
  onApplyTemplate,
}: EventTemplatesModalProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<EventTemplate>({
    title: "",
    participants: "",
    platform: "",
    reminders: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      onEditTemplate(editingIndex, formData);
      setEditingIndex(null);
    } else {
      onAddTemplate(formData);
    }
    setFormData({
      title: "",
      participants: "",
      platform: "",
      reminders: false,
    });
    setIsAdding(false);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(templates[index]);
    setIsAdding(true);
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
                <DocumentDuplicateIcon className="w-5 h-5 mr-2" />
                Event Templates
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
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Participants
                  </label>
                  <input
                    type="text"
                    value={formData.participants}
                    onChange={(e) =>
                      setFormData({ ...formData, participants: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Platform
                  </label>
                  <input
                    type="text"
                    value={formData.platform}
                    onChange={(e) =>
                      setFormData({ ...formData, platform: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.reminders}
                    onChange={(e) =>
                      setFormData({ ...formData, reminders: e.target.checked })
                    }
                    className="h-4 w-4 text-brand-gradient-from focus:ring-brand-gradient-from border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Enable Reminders
                  </label>
                </div>

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
                    {editingIndex !== null ? "Save Changes" : "Add Template"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {templates.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    No templates yet
                  </p>
                ) : (
                  templates.map((template, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {template.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Participants: {template.participants}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Platform: {template.platform}
                          </p>
                          {template.reminders && (
                            <span className="inline-block mt-1 px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                              Reminders Enabled
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(index)}
                            className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteTemplate(index)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => onApplyTemplate(template)}
                        className="mt-2 w-full px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
                      >
                        Apply Template
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
