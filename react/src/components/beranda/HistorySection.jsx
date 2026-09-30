import { useState } from "react";
import { berandaData } from "../../data/beranda";

export default function HistorySection() {
  const [showAllHistory, setShowAllHistory] = useState(false);
  const { mockData, ...historyMeta } = berandaData.history;

  // Compute stats
  const totalHematAcc = mockData.reduce((acc, item) => acc + (item.hargaEceran - item.hargaPorsiGrosir), 0);
  const avg = mockData.length > 0 ? Math.round(totalHematAcc / mockData.length) : 0;
  const visibleHistoryData = showAllHistory ? mockData : mockData.slice(0, 3);

  return (
    <section id="history-hemat" className="py-12 sm:py-16 bg-slate-100 dark:bg-slate-800/60 border-y border-slate-200/80 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div data-aos="fade-up" className="text-center mb-8 sm:mb-10">
          <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">{historyMeta.tag}</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{historyMeta.title}</p>
        </div>

        <div data-aos="zoom-in" className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 items-start">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl shadow-xl flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">{historyMeta.summaryTitle}</span>
                <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-semibold text-white">{historyMeta.summaryBadge}</span>
              </div>
              <p className="text-3xl sm:text-4xl font-black mt-3 mb-1">Rp {totalHematAcc.toLocaleString("id-ID")}</p>
              <p className="text-xs text-blue-100">Dari {mockData.length}x transaksi patungan selesai</p>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-400/30 flex items-center justify-between text-xs">
              <span className="text-blue-200">{historyMeta.avgText}</span>
              <span className="font-extrabold text-emerald-300">~Rp {avg.toLocaleString("id-ID")}</span>
            </div>
          </div>

          <div className="md:col-span-2 bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-700/60">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span>{historyMeta.listTitle}</span>
              </h3>
              <span className="text-[10px] sm:text-xs px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold rounded-full">{historyMeta.listBadge}</span>
            </div>

            <div className="space-y-3">
              {visibleHistoryData.map((item) => {
                const hematItem = item.hargaEceran - item.hargaPorsiGrosir;
                const persenItem = Math.round((hematItem / item.hargaEceran) * 100);
                
                return (
                  <div key={item.id} className="group p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800 transition">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex gap-2.5 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-sm sm:text-base border border-slate-100 dark:border-slate-700">
                          {item.kategori}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1">{item.nama}</h4>
                          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">Patungan {item.porsi} &bull; {item.tanggal}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-extrabold text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">+Rp {hematItem.toLocaleString("id-ID")}</p>
                        <p className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40 px-1.5 py-0.5 rounded flex inline-flex items-center gap-0.5 mt-1">
                          Hemat {persenItem}%
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {mockData.length > 3 && (
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50 text-center">
                <button 
                  onClick={() => setShowAllHistory(!showAllHistory)}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition inline-flex items-center gap-1 active:scale-95"
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
