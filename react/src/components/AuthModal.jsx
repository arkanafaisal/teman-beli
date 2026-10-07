import { GoogleLogin } from "@react-oauth/google";
import { appData } from "../data/app";
import { useState, useEffect } from "react";
import FormInput from "./common/FormInput";
import { X } from "lucide-react";

export default function AuthModal({ isOpen, onClose, onSuccess, onError, isDarkMode, onManualLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const data = appData.header.auth.modal;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-bg-surface w-full max-w-sm rounded-3xl p-5 sm:p-6 shadow-2xl border border-border-base flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-text-muted hover:bg-bg-subtle hover:text-text-base transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-extrabold text-text-heading mb-3 mt-1 text-center w-full">
          {data.title}
        </h3>

        <div
          className="bg-text-heading text-bg-surface p-2.5 rounded-xl text-xs sm:text-sm font-bold mb-3 w-full text-center shadow-md"
          dangerouslySetInnerHTML={{ __html: data.warningTextHtml }}
        />

        <form onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          await onManualLogin(email, password);
          setLoading(false);
        }} className="w-full space-y-2.5 mb-3 text-left">
          <FormInput
            type="email"
            placeholder={data.manualLogin.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormInput
            type="password"
            placeholder={data.manualLogin.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading} className="cursor-pointer w-full bg-primary-base hover:bg-primary-hover text-text-inverted font-bold py-2.5 rounded-xl disabled:opacity-50 text-sm">
            {loading ? data.manualLogin.buttonLoading : data.manualLogin.buttonNormal}
          </button>
        </form>

        <div className="flex items-center w-full mb-3">
          <div className="flex-1 border-t border-border-base"></div>
          <span className="px-3 text-[10px] text-text-muted font-bold">{data.manualLogin.divider}</span>
          <div className="flex-1 border-t border-border-base"></div>
        </div>

        <div className="w-full flex justify-center overflow-hidden rounded-xl shadow-sm hover:opacity-90 transition mb-4">
          <GoogleLogin
            onSuccess={onSuccess}
            onError={onError}
            theme={isDarkMode ? "filled_black" : "outline"}
            shape="pill"
            text="continue_with"
            width="100%"
          />
        </div>

        <p
          className="text-[11px] sm:text-xs text-text-muted text-justify leading-snug"
          dangerouslySetInnerHTML={{ __html: data.explanationTextHtml }}
        />
      </div>
    </div>
  );
}
