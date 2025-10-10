import React, { type ReactNode } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const PokemonDetails: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-80 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-[1rem] right-[1.5rem] text-gray-600 hover:text-gray-900 font-bold text-[1.2rem] cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default PokemonDetails;
