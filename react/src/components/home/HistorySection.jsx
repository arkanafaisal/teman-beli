import { useState } from "react";
import { homeData } from "../../data/home";
import { getCategoryIcon, getCategoryColor } from "../../utils/iconMapper";

export default function HistorySection() {
  const [showAllHistory, setShowAllHistory] = useState(false);
  const { mockData, isMock, ...historyMeta } = homeData.history;

  // Compute stats
  const totalHematAcc = mockData.reduce((acc, item) => acc + (item.retailPrice - item.wholesalePricePerPortion), 0);
  const avg = mockData.length > 0 ? Math.round(totalHematAcc / mockData.length) : 0;
  const visibleHistoryData = showAllHistory ? mockData : mockData.slice(0, 3);

  return (
    <section id="history-hemat" className="py-12 sm:py-16 bg-bg-subtle border-y border-border-base">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div data-aos="fade-up" className="text-center mb-8 sm:mb-10">
          <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary-text mb-1 sm:mb-2">{historyMeta.tag}</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-text-heading">{historyMeta.title}
            {/* {isMock && <span className="text-[10px] bg-warning-soft text-warning-text px-1 rounded ml-2 align-top">Mock</span>} */}
          </p>
        </div>

        <div data-aos="zoom-in" className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 items-start">
          <div className="bg-primary-gradient text-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl shadow-xl flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-text-inverted">{historyMeta.summaryTitle}</span>
                <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-semibold text-white">{historyMeta.summaryBadge}</span>
              </div>
              <p className="text-3xl sm:text-4xl font-black mt-3 mb-1">Rp {totalHematAcc.toLocaleString("id-ID")}</p>
              <p className="text-xs text-text-inverted">Dari {mockData.length}x transaksi patungan selesai</p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs">
              <span className="text-text-inverted">{historyMeta.avgText}</span>
              <span className="font-extrabold text-success-text">~Rp {avg.toLocaleString("id-ID")}</span>
            </div>
          </div>

          <div className="md:col-span-2 bg-bg-surface p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-border-base shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-border-subtle">
              <h3 className="font-bold text-xs sm:text-sm text-text-heading">
                {historyMeta.listTitle}
              </h3>
            </div>

            <div className="space-y-3">
              {visibleHistoryData.map((item) => {
                const hematItem = item.retailPrice - item.wholesalePricePerPortion;
                const persenItem = Math.round((hematItem / item.retailPrice) * 100);

                return (
                  <div key={item.id} className="group p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-bg-subtle border border-border-subtle hover:border-success-subtle transition">
                    <div className="flex flex-col gap-2">
                      {/* Title Row */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className={`shrink-0 ${getCategoryColor(item.category).split(' ')[0]}`}>
                          {getCategoryIcon(item.category, "w-3.5 h-3.5 sm:w-4 sm:h-4")}
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-text-heading line-clamp-1">{item.name}</h4>
                      </div>
                      
                      {/* Info & Price Row */}
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] sm:text-xs text-text-muted">
                          {item.portion} - {item.date}
                        </p>
                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                          <span className="font-extrabold text-[11px] sm:text-xs text-success-text">+Rp {hematItem.toLocaleString("id-ID")}</span>
                          <span className="text-[9px] sm:text-[10px] font-bold text-text-inverted bg-success-base px-1.5 py-0.5 rounded">
                            Hemat {persenItem}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {mockData.length > 3 && (
              <div className="mt-4 pt-3 border-t border-border-subtle text-center">
                <button
                  onClick={() => setShowAllHistory(!showAllHistory)}
                  className="text-xs font-semibold text-primary-text hover:text-primary-hover transition inline-flex items-center gap-1 active:scale-95"
                >
                  <span>{showAllHistory ? historyMeta.btnShowLess : historyMeta.btnShowMore}</span>
                  <span className={`transition-transform duration-200 ${showAllHistory ? 'rotate-180' : ''}`}>&darr;</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
