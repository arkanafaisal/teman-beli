import { exploreData } from "../../data/explore";
import { getCategoryIcon, getCategoryColor } from "../../utils/iconMapper";
import { Search } from "lucide-react";

export default function ExploreFilter({ searchQuery, setSearchQuery, activeCategory, setActiveCategory }) {
  return (
    <div data-aos="fade-up" data-aos-delay="100" className="bg-bg-surface p-4 rounded-2xl border border-border-subtle shadow-sm mb-8 flex flex-col md:flex-row gap-2 justify-between items-center">
      {/* Input Search Bar */}
      <div className="relative w-full md:w-96">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-text-muted">
          <Search className="w-4 h-4" strokeWidth={2.5} />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={exploreData.search.placeholder}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-base text-sm focus:ring-2 ring-primary-base outline-none transition"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none text-xs font-medium">
        {exploreData.filters.map((filter) => {
          const isActive = activeCategory === filter.value;
          return (
            <button
              key={filter.value}
              onClick={() => setActiveCategory(filter.value)}
              className={`px-3 py-1 rounded-xl transition whitespace-nowrap flex items-center gap-2 border font-bold ${isActive
                ? "bg-primary-base border-primary-base text-text-inverted shadow-sm"
                : "bg-transparent border-border-base text-text-base hover:border-border-subtle hover:bg-bg-subtle"
                }`}
            >
              {filter.icon && (
                <span className={isActive ? "text-text-inverted" : getCategoryColor(filter.icon).split(' ')[0]}>
                  {getCategoryIcon(filter.icon, "w-4 h-4 sm:w-5 sm:h-5")}
                </span>
              )}
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
