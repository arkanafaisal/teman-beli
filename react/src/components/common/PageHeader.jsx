export default function PageHeader({ title, subtitle, buttonText, onButtonClick }) {
  return (
    <div data-aos="fade-down" className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-black text-text-heading tracking-tight">{title}</h1>
        <p className="text-text-muted text-sm mt-1">{subtitle}</p>
      </div>
      <button
        onClick={onButtonClick}
        className="cursor-pointer bg-primary-base hover:bg-primary-hover active:bg-primary-hover text-text-inverted font-semibold px-6 py-3 rounded-2xl shadow-lg shadow-primary-glow transition flex items-center justify-center gap-2 group"
      >
        <span>{buttonText}</span>
      </button>
    </div>
  );
}
