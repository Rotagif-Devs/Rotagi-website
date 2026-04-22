"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100">
          <h3 className="text-2xl font-cal-sans font-medium text-gray-900">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {children}
        </div>
        
        <div className="p-6 md:p-8 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-[#e61e8a] text-white font-semibold rounded-full hover:opacity-95 transition-all shadow-lg shadow-pink-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
