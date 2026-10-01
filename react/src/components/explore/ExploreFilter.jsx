import { exploreData } from "../../data/explore";

export default function ExploreFilter({ searchQuery, setSearchQuery, activeCategory, setActiveCategory }) {
  return (
    <div data-aos="fade-up" data-aos-delay="100" className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
      {/* Input Search Bar */}
      <div className="relative w-full md:w-96">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
          🔍
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={exploreData.search.placeholder}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900/50 text-sm focus:ring-2 ring-blue-500 outline-none transition"
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
              className={
                isActive
                  ? "cat-btn active px-4 py-2 rounded-xl bg-blue-600 text-white transition whitespace-nowrap"
                  : "cat-btn px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition whitespace-nowrap"
              }
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
