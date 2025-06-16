import { Dialog, Transition } from '@headlessui/react';
import { SwatchIcon } from '@heroicons/react/24/outline';

interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

interface ThemesModalProps {
  isOpen: boolean;
  onClose: () => void;
  themes: Theme[];
  currentTheme: string;
  onApplyTheme: (themeName: string) => void;
}

export default function ThemesModal({
  isOpen,
  onClose,
  themes,
  currentTheme,
  onApplyTheme,
}: ThemesModalProps) {
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
            <Dialog.Title className="text-lg font-medium mb-4 flex items-center">
              <SwatchIcon className="w-5 h-5 mr-2" />
              Custom Themes
            </Dialog.Title>

            <div className="space-y-4">
              {themes.map((theme) => (
                <div
                  key={theme.name}
                  className={`p-4 rounded-lg border-2 ${
                    currentTheme === theme.name
                      ? 'border-brand-gradient-from'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {theme.name}
                    </h3>
                    {currentTheme === theme.name && (
                      <span className="text-sm text-green-600 dark:text-green-400">
                        Current Theme
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: theme.colors.secondary }}
                    />
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                  </div>

                  <button
                    onClick={() => onApplyTheme(theme.name)}
                    className={`mt-2 w-full px-4 py-2 text-sm font-medium rounded-md ${
                      currentTheme === theme.name
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'text-white bg-brand-gradient-from hover:bg-brand-gradient-to'
                    }`}
                    disabled={currentTheme === theme.name}
                  >
                    {currentTheme === theme.name ? 'Applied' : 'Apply Theme'}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-md"
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