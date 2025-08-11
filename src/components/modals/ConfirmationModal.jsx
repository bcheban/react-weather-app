import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          type="button" 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <h2 className="text-2xl mb-4 font-family-montserrat-alternates font-medium text-[20px] text-black">
          {title}
        </h2>
        
        <p className="mb-8 font-family-montserrat font-normal text-[14px] text-gray-600">
          {children}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors font-family-montserrat font-medium text-[14px] text-black"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-family-montserrat font-medium text-[14px]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;