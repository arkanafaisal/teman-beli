import { communityData } from "../../data/community";

export default function CommunityFilter({ activeFilter, setActiveFilter }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar" id="category-filter-container">
      {communityData.filters.map(filter => (
        <button
          key={filter.key}
          onClick={() => setActiveFilter(filter.key)}
          className={`px-4 py-2 rounded-xl text-xs whitespace-nowrap transition shadow-sm ${
            activeFilter === filter.key
              ? "font-bold bg-blue-600 text-white"
              : "font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-500"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
