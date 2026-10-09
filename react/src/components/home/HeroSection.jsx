import { homeData } from "../../data/home";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen-dvh flex flex-col justify-between pt-8 pb-4 sm:py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-primary-soft),transparent)] dark:bg-[radial-gradient(45rem_50rem_at_top,rgba(23,37,84,0.4),transparent)] opacity-70"></div>

      <div className="hidden sm:block"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center my-auto">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-text-heading tracking-tight leading-[1.18] mb-4 sm:mb-6">
          {homeData.hero.titleLine1} <br />
          <span className="bg-clip-text text-transparent bg-primary-gradient">
            {homeData.hero.titleLine2}
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-text-muted max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2 sm:px-0">
          {homeData.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto w-full px-2 sm:px-0">
          <a
            href="/patungan"
            className="w-full sm:w-auto bg-primary-base hover:bg-primary-hover active:bg-primary-hover text-text-inverted font-semibold px-7 py-3.5 rounded-2xl shadow-lg shadow-primary-glow transition flex items-center justify-center gap-2 group active:scale-95"
          >
            <span>{homeData.hero.primaryButton}</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
          {/* <a
            href="#history-hemat"
            className="w-full sm:w-auto bg-bg-surface border border-border-base hover:bg-bg-base text-text-base font-semibold px-6 py-3.5 rounded-2xl transition text-center shadow-sm active:scale-95"
          >
            {homeData.hero.secondaryButton}
          </a> */}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 w-full mt-6 sm:mt-12">
        <div className="grid grid-cols-3 sm:gap-6 pt-2 border-t border-border-base text-center">
          {homeData.stats.map((stat, idx) => (
            <div key={idx} className="p-2 sm:p-0">
              <p className="text-lg sm:text-3xl font-extrabold text-primary-text">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-xs text-text-muted font-medium mt-0.5 sm:mt-1 leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section >
  );
}
