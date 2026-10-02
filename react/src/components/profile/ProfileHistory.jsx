import { profileData } from "../../data/profile";
import { getCategoryIcon } from "../../utils/iconMapper";

export default function ProfileHistory() {
  const { title, subtitle, countBadge, activities } = profileData.historyCard;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-base text-text-heading">{title}</h3>
          <p className="text-xs text-text-muted">{subtitle}</p>
        </div>
        <span className="px-2.5 py-1 bg-bg-subtle text-text-muted text-xs rounded-lg font-medium">
          {countBadge}
        </span>
      </div>

      <div className="space-y-3">
        {activities.map((act) => (
          <div key={act.id} className="p-4 bg-bg-subtle border border-border-subtle rounded-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center font-bold text-lg shrink-0 mt-0.5 ${act.iconColor}`}>
                {getCategoryIcon(act.icon, "w-5 h-5 sm:w-6 sm:h-6")}
              </div>
              <div>
                <h4 className="font-bold text-xs text-text-heading">{act.title}</h4>
                <p className="text-[11px] text-text-muted mt-0.5">{act.status} &bull; {act.date}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="font-bold text-xs text-success-text">{act.amount}</span>
              <span className="block text-[10px] text-text-muted">Lunas</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
