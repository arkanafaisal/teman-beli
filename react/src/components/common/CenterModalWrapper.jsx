import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function CenterModalWrapper({ onClose, title, children }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 280);
  };

  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`} 
      onClick={handleClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className={`bg-bg-surface w-full max-w-2xl rounded-2xl shadow-2xl relative flex flex-col overflow-hidden max-h-[85dvh] ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border-base">
          <h2 className="font-bold text-lg">{title}</h2>
          <button 
            onClick={handleClose}
            className="p-1.5 hover:bg-bg-subtle rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>
        
        <div className="overflow-y-auto no-scrollbar p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
