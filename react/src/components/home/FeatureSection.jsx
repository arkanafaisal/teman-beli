import { homeData } from "../../data/home";

export default function FeatureSection() {
  return (
    <section id="fitur" className="py-12 sm:py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div data-aos="fade-up" className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary-text mb-1 sm:mb-2">{homeData.features.tag}</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-text-heading">{homeData.features.title}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {homeData.features.items.map((feature, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={(idx + 1) * 100}
              className="bg-bg-surface p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-border-subtle hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-soft text-primary-text rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6 font-bold">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-text-heading">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
