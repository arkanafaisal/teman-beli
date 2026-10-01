import { useState } from "react";
import { historyData } from "../data/history";
import HistorySummary from "../components/history/HistorySummary";
import HistoryCard from "../components/history/HistoryCard";
import { useAuth } from "../context/AuthContext";

export default function History() {
  const { user } = useAuth();
  const [showAll, setShowAll] = useState(false);
  const data = historyData.mockHistoryData;
  const displayedData = showAll ? data : data.slice(0, 3);

  if (!user.isLoggedIn) {
    return (
      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold mb-2">Belum Masuk</h2>
        <p className="text-slate-500 text-center mb-6">Silakan login menggunakan SSO Kampus untuk melihat riwayat patungan Anda.</p>
        <button onClick={() => window.location.href = "/"} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-blue-500/20">
          Kembali ke Beranda
        </button>
      </main>
    );
  }

  return (
    <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{historyData.header.title}</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{historyData.header.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Summary Card */}
        <HistorySummary />

        {/* List Section */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-4">{historyData.listSection.title}</h3>
          
          <div className="space-y-3">
            {displayedData.map((item) => (
              <HistoryCard key={item.id} item={item} />
            ))}
          </div>
          
          {data.length > 3 && (
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50 text-center">
              <button 
                onClick={() => setShowAll(!showAll)}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {showAll ? historyData.listSection.seeLess : historyData.listSection.seeMore}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
