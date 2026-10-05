import { profileData } from "../../data/profile";
import { getCategoryIcon } from "../../utils/iconMapper";
import { useState, useEffect } from "react";
import { api } from "../../services/api";

export default function ProfileHistory() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.history.getAll().then(res => {
      if (res.success) {
        setActivities(res.payload);
      }
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="mb-6">
        <h3 className="font-bold text-base text-text-heading">{profileData.historyCard.title}</h3>
        <p className="text-xs text-text-muted">{profileData.historyCard.subtitle}</p>
      </div>

      <div className="space-y-1">
        {loading ? (
          <p className="text-xs text-text-muted text-center py-6">{profileData.historyCard.loadingText}</p>
        ) : activities.length > 0 ? (
          activities.map((act) => {
            const dateObj = new Date(act.date);
            const dateStr = dateObj.toLocaleDateString("id-ID", { day: '2-digit', month: 'short' }) + " " + dateObj.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' });
            return (
              <div key={act.id} className="py-2 border-b border-border-subtle last:border-0 flex flex-col gap-0">
                <h4 className="font-bold text-sm text-text-heading leading-relaxed">
                  <span className={`inline-flex items-center justify-center font-bold text-base align-middle mr-2 ${act.type === 'HOST' ? 'text-primary-base' : 'text-success-text'}`}>
                    {getCategoryIcon(act.category, "w-4 h-4 sm:w-5 sm:h-5")}
                  </span>
                  {act.type === 'HOST' ? profileData.historyCard.roleHost : profileData.historyCard.roleJoin}: {act.title}
                </h4>
                <div className="flex items-center justify-between mt-0">
                  <span className="font-bold text-xs text-success-text">Rp {act.unitPrice?.toLocaleString('id-ID')} / {act.unit}</span>
                  <span className="text-xs text-text-muted flex gap-2">
                    {act.status === 'FINISHED' ? <span className="text-success-text">{profileData.historyCard.statusFinished}</span> : act.status === 'CANCELLED' ? <span className="text-danger-text">{profileData.historyCard.statusCancelled}</span> : <span>{act.status}</span>}
                    &bull; {dateStr}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-xs text-text-muted text-center py-6">{profileData.historyCard.emptyText}</p>
        )}
      </div>
    </>
  );
}
