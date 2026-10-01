import { exploreData } from "../../data/explore";

export default function ExploreFilter({ searchQuery, setSearchQuery, activeCategory, setActiveCategory }) {
  return (
    <section className="sticky top-16 sm:top-[4.5rem] z-30 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 py-4 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-4">
        {/* Search Bar */}
        <div className="relative" data-aos="fade-down" data-aos-delay="100">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={exploreData.search.placeholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900/50 text-sm focus:ring-2 ring-blue-500 outline-none transition text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 sm:gap-3 hide-scrollbar" data-aos="fade-down" data-aos-delay="200">
          {exploreData.filters.map((filter) => {
            const isActive = activeCategory === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => setActiveCategory(filter.value)}
                className={`px-4 py-2 rounded-xl text-sm transition whitespace-nowrap active:scale-95 ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-700"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
