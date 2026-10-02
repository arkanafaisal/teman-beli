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
              ? "font-bold bg-primary-base text-text-inverted"
              : "font-semibold bg-bg-surface border border-border-base text-text-base hover:border-primary-text"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
