import { useState, useEffect } from "react";
import { X, AlertTriangle, Info, CheckCircle } from "lucide-react";

export default function ActionModal({
  isOpen,
  type = "info", // "info", "confirm", "prompt"
  title,
  description,
  confirmText = "Oke",
  cancelText = "Batal",
  onConfirm,
  onCancel,
  matchText = "", // Text to match for "prompt" mode
  icon = "info", // "info", "warning", "success"
}) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setInputValue("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (type === "prompt") {
      if (inputValue !== matchText) {
        setError(`Ketikkan "${matchText}" dengan benar.`);
        return;
      }
    }
    onConfirm(inputValue);
  };

  const getIcon = () => {
    switch (icon) {
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-warning-text" />;
      case "success":
        return <CheckCircle className="w-6 h-6 text-success-text" />;
      default:
        return <Info className="w-6 h-6 text-primary-text" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onCancel}
      ></div>
      <div className="relative bg-bg-surface dark:bg-bg-base border border-border-subtle w-full max-w-sm p-6 rounded-2xl shadow-2xl animate-slide-up">
        
        {/* Close Button */}
        {type !== "info" && (
          <button 
            onClick={onCancel}
            className="absolute top-4 right-4 p-1.5 rounded-full text-text-muted hover:bg-bg-subtle transition active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 p-3 rounded-full bg-bg-subtle shadow-inner">
            {getIcon()}
          </div>
          <h3 className="text-xl font-bold text-text-heading mb-2">{title}</h3>
          <p className="text-sm text-text-muted mb-6 leading-relaxed">
            {description}
          </p>

          {/* Prompt Input */}
          {type === "prompt" && (
            <div className="w-full mb-6 text-left">
              <label className="block text-xs font-semibold text-text-muted mb-1.5">
                Ketik <span className="font-bold text-text-heading select-all">"{matchText}"</span> untuk konfirmasi
              </label>
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (error) setError("");
                }}
                className={`w-full px-3 py-2 text-sm rounded-xl border dark:bg-bg-subtle outline-none transition-colors ${
                  error ? "border-danger-base focus:ring-1 focus:ring-danger-base" : "border-border-base focus:ring-1 focus:ring-primary-base"
                }`}
                placeholder={matchText}
              />
              {error && <span className="text-[10px] font-medium text-danger-text mt-1 block">{error}</span>}
            </div>
          )}

          {/* Actions */}
          <div className="flex w-full gap-3 mt-2">
            {(type === "confirm" || type === "prompt") && (
              <button 
                onClick={onCancel}
                className="flex-1 py-2.5 rounded-xl font-semibold text-sm border border-border-base text-text-base hover:bg-bg-subtle transition active:scale-95"
              >
                {cancelText}
              </button>
            )}
            <button 
              onClick={handleConfirm}
              className={`flex-1 py-2.5 rounded-xl font-semibold text-sm text-text-inverted transition shadow-sm active:scale-95 ${
                icon === "warning" ? "bg-danger-base hover:bg-danger-hover" : "bg-primary-base hover:bg-primary-hover shadow-primary-glow"
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
