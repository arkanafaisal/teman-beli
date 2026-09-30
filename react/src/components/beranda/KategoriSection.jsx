import { berandaData } from "../../data/beranda";

export default function KategoriSection() {
  return (
    <section id="kategori" className="py-12 sm:py-16 bg-white dark:bg-slate-800/40 border-y border-slate-200/80 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div data-aos="fade-up" className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">{berandaData.kategori.tag}</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{berandaData.kategori.title}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {berandaData.kategori.items.map((cat, idx) => (
            <div key={idx} data-aos="zoom-in" data-aos-delay={(idx + 1) * 100} className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 text-center hover:border-blue-500 transition active:scale-95">
              <span className="text-2xl sm:text-3xl block mb-2">{cat.icon}</span>
              <h3 className="font-bold text-xs sm:text-sm mb-1 text-slate-900 dark:text-white">{cat.title}</h3>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 leading-tight">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
