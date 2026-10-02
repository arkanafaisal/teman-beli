import { homeData } from "../../data/home";

export default function FaqSection() {
  return (
    <section id="faq" className="py-12 sm:py-16 bg-bg-subtle border-t border-border-base">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div data-aos="fade-up" className="text-center mb-8 sm:mb-12">
          <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary-text mb-1 sm:mb-2">{homeData.faq.tag}</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-text-heading">{homeData.faq.title}</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {homeData.faq.items.map((item, idx) => (
            <details
              key={idx}
              data-aos="fade-up"
              data-aos-delay={(idx + 1) * 100}
              className="group p-4 sm:p-5 bg-bg-subtle rounded-xl sm:rounded-2xl border border-border-subtle [&_summary::-webkit-details-marker]:hidden cursor-pointer"
            >
              <summary className="flex items-center justify-between font-bold text-xs sm:text-sm text-text-base">
                <span>{item.q}</span>
                <span className="transition group-open:rotate-180 text-primary-text ml-2">&darr;</span>
              </summary>
              <p className="mt-2.5 sm:mt-3 text-xs text-text-muted leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
