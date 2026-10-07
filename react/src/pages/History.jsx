import { useState } from "react";
import { historyData } from "../data/history";
import HistorySummary from "../components/history/HistorySummary";
import HistoryCard from "../components/history/HistoryCard";
import { useAuth } from "../context/AuthContext";
import { LockKeyhole } from "lucide-react";

export default function History() {
  const { user, isInitializing } = useAuth();
  const [showAll, setShowAll] = useState(false);
  const data = historyData.mockHistoryData;
  const displayedData = showAll ? data : data.slice(0, 3);

  if (isInitializing) {
    return (
      <main className="flex-grow flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-base border-r-4 border-r-transparent mb-4"></div>
        <p className="text-text-muted font-medium text-sm">Memuat riwayat...</p>
      </main>
    );
  }

  if (!user.isLoggedIn) {
    return (
      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full flex flex-col items-center justify-center min-h-[60vh]">
        <div className="mb-4 text-text-muted"><LockKeyhole size={64} strokeWidth={1.5} /></div>
        <h2 className="text-2xl font-bold mb-2">Belum Masuk</h2>
        <p className="text-text-muted text-center mb-6">Silakan masuk menggunakan email kampus untuk melihat riwayat patungan Anda.</p>
        <button onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal'))} className="cursor-pointer bg-primary-base hover:bg-primary-hover text-text-inverted px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-primary-glow">
          Masuk / Daftar
        </button>
      </main>
    );
  }

  return (
    <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-heading mb-1">{historyData.header.title}</h1>
        <p className="text-xs sm:text-sm text-text-muted">{historyData.header.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Summary Card */}
        <HistorySummary />

        {/* List Section */}
        <div className="md:col-span-2 bg-bg-surface p-6 rounded-3xl border border-border-base shadow-sm">
          <h3 className="font-bold text-sm sm:text-base text-text-heading mb-4">{historyData.listSection.title}</h3>

          <div className="space-y-3">
            {displayedData.map((item) => (
              <HistoryCard key={item.id} item={item} />
            ))}
          </div>

          {data.length > 3 && (
            <div className="mt-4 pt-3 border-t border-border-subtle text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-xs font-semibold text-primary-text hover:underline"
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
