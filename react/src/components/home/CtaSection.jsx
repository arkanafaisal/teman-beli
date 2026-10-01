import { homeData } from "../../data/home";

export default function CtaSection() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 my-10 sm:my-16">
      <div data-aos="zoom-in" className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-white text-center shadow-xl">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 tracking-tight">{homeData.cta.title}</h2>
          <p className="text-blue-100 text-xs sm:text-base mb-6 sm:mb-8 leading-relaxed">{homeData.cta.subtitle}</p>
          <a
            href="/eksplor"
            className="inline-block bg-white hover:bg-blue-50 text-blue-700 font-extrabold px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg hover:scale-105 transition transform active:scale-95 text-sm sm:text-base"
          >
            {homeData.cta.button} &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
