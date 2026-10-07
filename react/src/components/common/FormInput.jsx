import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function FormInput({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  options = null,
  maxLength,
  rows,
  helpText,
  error,
  suffix
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const inputType = isPasswordType ? (showPassword ? "text" : "password") : type;

  const baseClasses = `w-full px-4 py-2.5 rounded-xl border dark:bg-bg-subtle focus:ring-2 outline-none transition-colors ${
    error ? "border-danger-base focus:ring-danger-base" : "border-border-base focus:ring-primary-base"
  }`;

  return (
    <div>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      {type === "select" && options ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={baseClasses}
        >
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={rows || 3}
          maxLength={maxLength}
          className={baseClasses}
        />
      ) : (
        <div className="relative flex items-center">
          <input
            type={inputType}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            maxLength={maxLength}
            className={`${baseClasses} ${(suffix || isPasswordType) ? (suffix ? 'pr-20' : 'pr-12') : ''}`}
          />
          {isPasswordType && !suffix && (
            <button
              type="button"
              className="absolute right-3 cursor-pointer text-text-muted hover:text-text-base focus:outline-none flex items-center justify-center p-1 rounded-full transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
          {suffix && (
            <span className="absolute right-4 text-xs font-semibold text-text-muted truncate max-w-[5rem]">
              {suffix}
            </span>
          )}
        </div>
      )}
      {error && <span className="text-xs text-danger-base mt-1.5 block font-medium">{error}</span>}
      {helpText && !error && <span className="text-xs text-text-muted mt-1.5 block">{helpText}</span>}
    </div>
  );
}
