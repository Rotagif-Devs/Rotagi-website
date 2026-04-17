"use client";
import { useEffect } from 'react';
import { FiCheckCircle, FiX } from 'react-icons/fi';
 
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  title?: string;
}
 
export default function SuccessModal({ isOpen, onClose, message, title }: SuccessModalProps) {
  useEffect(() => {
    if (!isOpen) return;
 
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
 
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);
 
  if (!isOpen) return null;
 
  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/25"
        onClick={onClose}
      />
 
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
            <div className="absolute right-4 top-4">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>
 
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FiCheckCircle className="w-8 h-8 text-green-600" />
              </div>
 
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {title || 'Success!'}
              </h3>
 
              <div className="mt-2">
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  {message || 'Please check your email for a verification link.'}
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
          </div>
        </div>
      </div>
    </div>
  );
}