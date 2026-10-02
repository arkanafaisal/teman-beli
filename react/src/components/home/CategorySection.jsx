import { homeData } from "../../data/home";
import { getCategoryIcon, getCategoryColor } from "../../utils/iconMapper";

export default function CategorySection() {
  return (
    <section id="kategori" className="py-12 sm:py-16 bg-bg-subtle border-y border-border-base">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div data-aos="fade-up" className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary-text mb-1 sm:mb-2">{homeData.categories.tag}</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-text-heading">{homeData.categories.title}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {homeData.categories.items.map((cat, idx) => (
            <div key={idx} data-aos="zoom-in" data-aos-delay={(idx + 1) * 100} className="p-4 sm:p-5 bg-bg-surface rounded-2xl border border-border-subtle text-center hover:border-primary-text transition active:scale-95 group">
              {getCategoryIcon(cat.icon, `w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 ${getCategoryColor(cat.icon).split(' ')[0]}`)}
              <h3 className="font-bold text-xs sm:text-sm mb-1 text-text-heading">{cat.title}</h3>
              <p className="text-[10px] sm:text-xs text-text-muted leading-tight">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
