import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import {
  DocumentIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

interface Resource {
  id: string;
  title: string;
  type: "document" | "link" | "video" | "image";
  url: string;
  description: string;
  category: string;
  uploadDate: string;
  size?: string;
  downloads: number;
}

interface EventResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  resources: Resource[];
  onAddResource: (
    resource: Omit<Resource, "id" | "uploadDate" | "downloads">
  ) => void;
  onUpdateResource: (resource: Resource) => void;
  onDeleteResource: (resourceId: string) => void;
  onDownloadResource: (resourceId: string) => void;
}

export default function EventResourcesModal({
  isOpen,
  onClose,
  resources,
  onAddResource,
  onUpdateResource,
  onDeleteResource,
  onDownloadResource,
}: EventResourcesModalProps) {
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [newResource, setNewResource] = useState<
    Omit<Resource, "id" | "uploadDate" | "downloads">
  >({
    title: "",
    type: "document",
    url: "",
    description: "",
    category: "",
  });

  const handleAddResource = () => {
    if (newResource.title && newResource.url) {
      onAddResource(newResource);
      setNewResource({
        title: "",
        type: "document",
        url: "",
        description: "",
        category: "",
      });
      setIsAddingResource(false);
    }
  };

  const handleUpdateResource = () => {
    if (editingResource) {
      onUpdateResource(editingResource);
      setEditingResource(null);
    }
  };

  const getResourceIcon = (type: Resource["type"]) => {
    switch (type) {
      case "document":
        return <DocumentIcon className="w-5 h-5" />;
      case "link":
        return <LinkIcon className="w-5 h-5" />;
      case "video":
        return (
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
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "image":
        return (
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
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      default:
        return <DocumentIcon className="w-5 h-5" />;
    }
  };

  const categories = [
    "Presentation",
    "Handout",
    "Recording",
    "Template",
    "Guide",
    "Other",
  ];

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
                <DocumentIcon className="w-5 h-5 mr-2" />
                Event Resources
              </div>
              <button
                onClick={() => setIsAddingResource(true)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </Dialog.Title>

            {(isAddingResource || editingResource) && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resource Title
                  </label>
                  <input
                    type="text"
                    value={editingResource?.title || newResource.title}
                    onChange={(e) =>
                      editingResource
                        ? setEditingResource({
                            ...editingResource,
                            title: e.target.value,
                          })
                        : setNewResource({
                            ...newResource,
                            title: e.target.value,
                          })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resource Type
                  </label>
                  <select
                    value={editingResource?.type || newResource.type}
                    onChange={(e) =>
                      editingResource
                        ? setEditingResource({
                            ...editingResource,
                            type: e.target.value as Resource["type"],
                          })
                        : setNewResource({
                            ...newResource,
                            type: e.target.value as Resource["type"],
                          })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  >
                    <option value="document">Document</option>
                    <option value="link">Link</option>
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    value={editingResource?.url || newResource.url}
                    onChange={(e) =>
                      editingResource
                        ? setEditingResource({
                            ...editingResource,
                            url: e.target.value,
                          })
                        : setNewResource({
                            ...newResource,
                            url: e.target.value,
                          })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={editingResource?.category || newResource.category}
                    onChange={(e) =>
                      editingResource
                        ? setEditingResource({
                            ...editingResource,
                            category: e.target.value,
                          })
                        : setNewResource({
                            ...newResource,
                            category: e.target.value,
                          })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={
                      editingResource?.description || newResource.description
                    }
                    onChange={(e) =>
                      editingResource
                        ? setEditingResource({
                            ...editingResource,
                            description: e.target.value,
                          })
                        : setNewResource({
                            ...newResource,
                            description: e.target.value,
                          })
                    }
                    rows={3}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gradient-from focus:ring-brand-gradient-from"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setIsAddingResource(false);
                      setEditingResource(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={
                      editingResource ? handleUpdateResource : handleAddResource
                    }
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
                  >
                    {editingResource ? "Save Changes" : "Add Resource"}
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div
                        className={`p-2 rounded-full ${
                          resource.type === "document"
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                            : resource.type === "link"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                            : resource.type === "video"
                            ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                            : "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
                        }`}
                      >
                        {getResourceIcon(resource.type)}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {resource.description}
                        </p>
                        <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          <span>{resource.category}</span>
                          {resource.size && <span>{resource.size}</span>}
                          <span>{resource.downloads} downloads</span>
                          <span>
                            {new Date(resource.uploadDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onDownloadResource(resource.id)}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        <ArrowDownTrayIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setEditingResource(resource)}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDeleteResource(resource.id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
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
