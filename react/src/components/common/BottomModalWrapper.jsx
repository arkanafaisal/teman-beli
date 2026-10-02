import { useState } from "react";

export default function BottomModalWrapper({ onClose, children }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 280);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`} 
      onClick={handleClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className={`bg-bg-surface w-full sm:max-w-xl rounded-t-[32px] sm:rounded-3xl shadow-2xl relative flex flex-col max-h-[65vh] sm:max-h-[85vh] mt-16 sm:mt-0 ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}
      >
        <div className="sticky top-0 z-10 bg-bg-surface px-5 py-4 pt-3 rounded-t-[32px] flex flex-col items-center">
          <div className="w-12 h-1.5 bg-border-base rounded-full cursor-grab active:cursor-grabbing"></div>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 no-scrollbar pb-10">
          {children}
        </div>
      </div>
    </div>
  );
}
