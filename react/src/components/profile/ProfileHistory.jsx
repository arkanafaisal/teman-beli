import { profileData } from "../../data/profile";

export default function ProfileHistory() {
  const { title, subtitle, countBadge, activities } = profileData.historyCard;

  return (
    <div className="bg-bg-surface rounded-3xl p-6 sm:p-8 border border-border-base shadow-sm mt-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-text-heading">{title}</h2>
          <p className="text-xs sm:text-sm text-text-muted mt-1">{subtitle}</p>
        </div>
        <span className="hidden sm:inline-block px-3 py-1 bg-bg-subtle text-text-muted text-xs font-bold rounded-lg">
          {countBadge}
        </span>
      </div>

      <div className="space-y-3 flex-grow">
        {activities.map((act) => (
          <div key={act.id} className="flex items-center justify-between p-4 bg-bg-surface hover:bg-bg-subtle border border-border-subtle rounded-2xl transition cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-inner ${act.iconBg} ${act.iconColor}`}>
                {act.icon}
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-text-heading group-hover:text-primary-text transition">{act.title}</h3>
                <p className="text-xs text-text-muted mt-0.5">{act.date}</p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="font-bold text-text-heading">{act.amount}</p>
              <p className="text-[11px] font-semibold text-success-text mt-0.5">{act.status}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => window.location.href = "/riwayat"}
        className="w-full mt-5 py-3 text-sm font-semibold text-primary-text hover:bg-primary-soft rounded-xl transition mt-auto"
      >
        Lihat Semua Riwayat
      </button>
    </div>
  );
}
