import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
      
      <div className="bg-white-50 rounded-lg p-6 w-full max-w-md shadow-lg relative">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-green-700 hover:text-green-900 font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Modal;
