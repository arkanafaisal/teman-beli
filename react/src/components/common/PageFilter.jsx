import { getCategoryIcon, getCategoryColor } from "../../utils/iconMapper";
import { Search, Filter, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function PageFilter({ 
  searchQuery, 
  setSearchQuery, 
  activeCategory, 
  setActiveCategory, 
  filters = [], 
  searchPlaceholder = "Cari...",
  tabs = [],
  activeTab,
  setActiveTab
}) {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsCategoryModalOpen(false);
      }
    }
    if (isCategoryModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCategoryModalOpen]);

  const isMulti = Array.isArray(activeCategory);
  let activeCategoryLabel = "Kategori";
  const isActiveFilter = isMulti ? activeCategory.length > 0 : (activeCategory !== "All" && activeCategory !== "all");

  if (isMulti && activeCategory.length > 0) {
    activeCategoryLabel = `${activeCategory.length} Kategori`;
  } else if (!isMulti && isActiveFilter) {
    activeCategoryLabel = filters.find(f => f.value === activeCategory)?.label || "Kategori";
  }

  return (
    <div data-aos="fade-up" data-aos-delay="100" className="bg-bg-surface p-4 rounded-2xl border border-border-subtle shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between items-center relative z-30">
      {/* Input Search Bar */}
      <div className="relative w-full md:w-96">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-text-muted">
          <Search className="w-4 h-4" strokeWidth={2.5} />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-base text-sm focus:ring-2 ring-primary-base outline-none transition"
        />
      </div>

      {/* Tabs & Category Button Container */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none text-xs font-medium w-full pb-1">
          {tabs.map((tab) => {
            const isMultiTab = Array.isArray(activeTab);
            const isActive = isMultiTab ? activeTab.includes(tab.id) : activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (setActiveTab) {
                    if (isMultiTab) {
                      if (isActive) setActiveTab(activeTab.filter(id => id !== tab.id));
                      else setActiveTab([...activeTab, tab.id]);
                    } else {
                      setActiveTab(isActive ? "all" : tab.id);
                    }
                  }
                }}
                className={`px-4 py-2.5 rounded-xl transition whitespace-nowrap flex items-center gap-2 border font-bold cursor-pointer ${isActive
                  ? "bg-primary-base border-primary-base text-text-inverted shadow-sm"
                  : "bg-transparent border-border-base text-text-base hover:border-border-subtle hover:bg-bg-subtle"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}

          {filters && filters.length > 0 && (
            <div ref={filterRef}>
              <button
                onClick={() => setIsCategoryModalOpen(!isCategoryModalOpen)}
                className={`p-2.5 rounded-xl transition flex items-center justify-center border font-bold cursor-pointer whitespace-nowrap flex-shrink-0 ${isActiveFilter
                  ? "bg-primary-soft border-primary-base text-primary-base"
                  : "bg-transparent border-border-base text-text-base hover:bg-bg-subtle"
                  }`}
              >
                {isCategoryModalOpen ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
                {isActiveFilter && <span className="ml-2 text-xs">{activeCategoryLabel}</span>}
              </button>

              {isCategoryModalOpen && (
                <div className="absolute right-4 md:right-4 top-full mt-2 w-56 sm:w-64 bg-bg-surface border border-border-subtle rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-2 flex flex-col gap-1 max-h-[60vh] overflow-y-auto scrollbar-none">
                    {filters.map((filter) => {
                      const isActive = isMulti ? activeCategory.includes(filter.value) : activeCategory === filter.value;
                      return (
                        <button
                          key={filter.value}
                          onClick={() => {
                            if (isMulti) {
                              if (isActive) {
                                setActiveCategory(activeCategory.filter(c => c !== filter.value));
                              } else {
                                setActiveCategory([...activeCategory, filter.value]);
                              }
                            } else {
                              setActiveCategory(isActive ? "All" : filter.value);
                              setIsCategoryModalOpen(false);
                            }
                          }}
                          className={`p-3 rounded-xl transition flex items-center gap-3 w-full text-left cursor-pointer ${isActive
                            ? "bg-primary-soft text-primary-base font-bold"
                            : "bg-transparent hover:bg-bg-subtle text-text-base font-medium"
                            }`}
                        >
                          {filter.icon && (
                            <span className={isActive ? "text-primary-base" : getCategoryColor(filter.icon).split(' ')[0]}>
                              {getCategoryIcon(filter.icon, "w-4 h-4")}
                            </span>
                          )}
                          <span className="text-sm">
                            {filter.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
