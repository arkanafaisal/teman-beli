import { profileData } from "../../data/profile";
import { getCategoryIcon } from "../../utils/iconMapper";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import HistoryDetailModal from "./HistoryDetailModal";

export default function ProfileHistory() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    api.history.getAll().then(res => {
      if (res.success) {
        setActivities(res.payload);
      }
      setLoading(false);
    });
  }, []);

  const handleReviewed = (activityId) => {
    setActivities(prev => prev.map(act => 
      act.id === activityId ? { ...act, isReviewed: true } : act
    ));
  };

  const renderStatus = (status) => {
    const d = profileData.historyCard;
    switch (status) {
      case 'FINISHED': return <span className="text-success-text">{d.statusFinished}</span>;
      case 'CANCELLED': return <span className="text-danger-text">{d.statusCancelled}</span>;
      case 'OPEN': return <span className="text-primary-base">{d.statusOpen}</span>;
      case 'FULL': return <span className="text-warning-text font-bold">{d.statusFull}</span>;
      case 'PENDING': return <span className="text-warning-text">{d.statusPending}</span>;
      case 'ACCEPTED': return <span className="text-success-text">{d.statusAccepted}</span>;
      case 'REJECTED': return <span className="text-danger-text">{d.statusRejected}</span>;
      default: return <span>{status}</span>;
    }
  };

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
              <div 
                key={act.id} 
                onClick={() => setSelectedActivity(act)}
                className="py-2 border-b border-border-subtle last:border-0 flex flex-col gap-0 cursor-pointer hover:bg-bg-subtle transition px-2 -mx-2 rounded-lg"
              >
                <h4 className="font-bold text-sm text-text-heading leading-relaxed">
                  <span className={`inline-flex items-center justify-center font-bold text-base align-middle mr-2 ${act.type === 'HOST' ? 'text-primary-base' : 'text-success-text'}`}>
                    {getCategoryIcon(act.category, "w-4 h-4 sm:w-5 sm:h-5")}
                  </span>
                  {act.type === 'HOST' ? profileData.historyCard.roleHost : profileData.historyCard.roleJoin}: {act.title}
                </h4>
                <div className="flex items-center justify-between mt-0">
                  <span className="font-bold text-xs text-success-text">Rp {act.unitPrice?.toLocaleString('id-ID')} / {act.unit}</span>
                  <span className="text-xs text-text-muted flex gap-2 items-center">
                    {renderStatus(act.status)}
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

      <HistoryDetailModal 
        isOpen={!!selectedActivity} 
        onClose={() => setSelectedActivity(null)} 
        activity={selectedActivity} 
        onReviewed={handleReviewed}
      />
    </>
  );
}
