import { GoogleLogin } from "@react-oauth/google";
import { appData } from "../data/app";

export default function AuthModal({ isOpen, onClose, onSuccess, onError, isDarkMode }) {
  if (!isOpen) return null;

  const data = appData.header.auth.modal;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-bg-surface w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-border-base flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
        <h3 className="text-xl font-extrabold text-text-heading mb-4 mt-2 text-center w-full">
          {data.title}
        </h3>
        
        <div 
          className="bg-text-heading text-bg-surface p-3.5 rounded-xl text-sm font-bold mb-5 w-full text-center shadow-md"
          dangerouslySetInnerHTML={{ __html: data.warningTextHtml }}
        />
        
        <div className="w-full flex justify-center overflow-hidden rounded-xl shadow-sm hover:opacity-90 transition mb-6">
          <GoogleLogin
            onSuccess={onSuccess}
            onError={onError}
            theme={isDarkMode ? "filled_black" : "outline"}
            shape="pill"
            text="signin_with"
            width="100%"
          />
        </div>

        <p 
          className="text-xs text-text-muted text-justify leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data.explanationTextHtml }}
        />
      </div>
    </div>
  );
}
