import { profileData } from "../../data/profile";
import { getCategoryIcon } from "../../utils/iconMapper";

export default function ProfileHistory() {
  const { title, subtitle, countBadge, activities } = profileData.historyCard;

  return (
    <>
      <div className="mb-6">
        <h3 className="font-bold text-base text-text-heading">{title}</h3>
        <p className="text-xs text-text-muted">{subtitle}</p>
      </div>

      <div className="space-y-1">
        {activities.map((act) => (
          <div key={act.id} className="py-2 border-b border-border-subtle last:border-0 flex flex-col gap-0">
            <h4 className="font-bold text-sm text-text-heading leading-relaxed">
              <span className={`inline-flex items-center justify-center font-bold text-base align-middle mr-2 ${act.iconColor}`}>
                {getCategoryIcon(act.icon, "w-4 h-4 sm:w-5 sm:h-5")}
              </span>
              {act.title}
            </h4>
            <div className="flex items-center justify-between mt-0">
              <span className="font-bold text-sm text-success-text">{act.amount}</span>
              <span className="text-xs text-text-muted">{act.date}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
