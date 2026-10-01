import { profileData } from "../../data/profile";

export default function ProfileHistory() {
  const { title, subtitle, countBadge, activities } = profileData.historyCard;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm mt-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
        </div>
        <span className="hidden sm:inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg">
          {countBadge}
        </span>
      </div>

      <div className="space-y-3 flex-grow">
        {activities.map((act) => (
          <div key={act.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 border border-slate-100 dark:border-slate-700 rounded-2xl transition cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-inner ${act.iconBg} ${act.iconColor}`}>
                {act.icon}
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{act.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{act.date}</p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="font-bold text-slate-900 dark:text-white">{act.amount}</p>
              <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">{act.status}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => window.location.href = "/riwayat"}
        className="w-full mt-5 py-3 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition mt-auto"
      >
        Lihat Semua Riwayat
      </button>
    </div>
  );
}
