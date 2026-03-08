// components/SuccessModal.tsx
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FiCheckCircle, FiX } from 'react-icons/fi';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  title?: string;
}

export default function SuccessModal({ isOpen, onClose, message, title }: SuccessModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="absolute right-4 top-4">
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <FiCheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold text-gray-900 mb-2"
                  >
                    {title || "Success!"}
                  </Dialog.Title>
                  
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 whitespace-pre-line">
                      {message || "Please check your email for a verification link."}
                    </p>
                  </div>

                  <div className="mt-6 w-full">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent bg-pink-600 px-6 py-3 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 transition-colors"
                      onClick={onClose}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}