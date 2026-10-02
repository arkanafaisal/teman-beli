import { homeData } from "../../data/home";
import { ShieldCheck, Calculator, MapPin } from "lucide-react";

const getFeatureIcon = (emoji) => {
  switch (emoji) {
    case "🛡️": return <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />;
    case "🧮": return <Calculator className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />;
    case "📍": return <MapPin className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />;
    default: return emoji;
  }
};

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
              <div className="flex items-start gap-3 sm:gap-4 mb-2 sm:mb-3">
                <div className="text-primary-base shrink-0 mt-0.5 sm:mt-1">
                  {getFeatureIcon(feature.icon)}
                </div>
                <h3 className="my-auto font-bold text-base sm:text-xl text-text-heading leading-tight">{feature.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
