export default function Badge({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center justify-center bg-primary-base text-text-inverted px-1.5 py-0.5 rounded-full font-bold tracking-wide uppercase leading-none ${className}`}>
      {children}
    </span>
  );
}
