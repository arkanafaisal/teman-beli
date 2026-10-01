import { homeData } from "../../data/home";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen-dvh flex flex-col justify-between pt-4 pb-8 sm:py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.100),transparent)] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.950/40%),transparent)] opacity-70"></div>

      <div className="hidden sm:block"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center my-auto">
        <h1 data-aos="fade-up" data-aos-duration="1000" className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.18] mb-4 sm:mb-6">
          {homeData.hero.titleLine1} <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"> 
            {homeData.hero.titleLine2} 
          </span>
        </h1>

        <p data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000" className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2 sm:px-0">
          {homeData.hero.subtitle}
        </p>

        <div data-aos="zoom-in" data-aos-delay="400" className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto w-full px-2 sm:px-0">
          <a
            href="/eksplor"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-7 py-3.5 rounded-2xl shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2 group active:scale-95"
          >
            <span>{homeData.hero.primaryButton}</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
          <a
            href="#history-hemat"
            className="w-full sm:w-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold px-6 py-3.5 rounded-2xl transition text-center shadow-sm active:scale-95"
          >
            {homeData.hero.secondaryButton}
          </a>
        </div>
      </div>

      <div data-aos="fade-up" data-aos-delay="600" className="max-w-3xl mx-auto px-4 w-full mt-6 sm:mt-12">
        <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-6 border-t border-slate-200/60 dark:border-slate-800/80 text-center">
          {homeData.stats.map((stat, idx) => (
            <div key={idx} className="p-2 sm:p-0">
              <p className="text-xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 sm:mt-1 leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
