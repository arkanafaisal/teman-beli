import { homeData } from "../data/home";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-6 sm:py-8 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-500 dark:text-slate-400">
        <p>{homeData.footer.copyright}</p>
        <div className="flex items-center gap-4 sm:gap-6">
          {homeData.footer.links.map((link, idx) => (
            <a key={idx} href={link.href} className="hover:underline">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
