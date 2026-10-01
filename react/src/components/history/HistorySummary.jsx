import { historyData } from "../../data/history";

export default function HistorySummary() {
  const { summaryCard } = historyData;

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-3xl shadow-xl">
      <span className="text-xs font-bold uppercase tracking-wider text-blue-200">{summaryCard.title}</span>
      <p className="text-3xl sm:text-4xl font-black mt-3 mb-1">{summaryCard.totalAmount}</p>
      <p className="text-xs text-blue-100">{summaryCard.subtext}</p>
      <div className="mt-6 pt-4 border-t border-blue-400/30 flex items-center justify-between text-xs">
        <span className="text-blue-200">{summaryCard.avgText}</span>
        <span className="font-bold text-emerald-300">{summaryCard.avgAmount}</span>
      </div>
    </div>
  );
}
