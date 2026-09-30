import { berandaData } from "../../data/beranda";

export default function TestimoniSection() {
  return (
    <section id="testimoni" className="py-12 sm:py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div data-aos="fade-up" className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">{berandaData.testimoni.tag}</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{berandaData.testimoni.title}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {berandaData.testimoni.items.map((testi, idx) => (
            <div key={idx} data-aos="fade-up" data-aos-delay={(idx + 1) * 100} className="p-5 sm:p-6 bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 italic leading-relaxed">"{testi.quote}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm text-white ${idx === 0 ? 'bg-blue-600' : idx === 1 ? 'bg-indigo-600' : 'bg-emerald-600'}`}>
                  {testi.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm">{testi.name}</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400">{testi.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
