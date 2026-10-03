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
  helpText
}) {
  const baseClasses = "w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none";

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
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
          className={baseClasses}
        />
      )}
      {helpText && <span className="text-xs text-text-muted">{helpText}</span>}
    </div>
  );
}
