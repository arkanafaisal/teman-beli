import { profileData } from "../../data/profile";
import { getCategoryIcon } from "../../utils/iconMapper";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { toast } from "sonner";
import HistoryDetailModal from "./HistoryDetailModal";
import CommunityDetailModal from "../community/CommunityDetailModal";
import CommunityForm from "../community/CommunityForm";
import CenterModalWrapper from "../common/CenterModalWrapper";
import ActionModal from "../common/ActionModal";
import PatunganDetailModal from "../patungan/PatunganDetailModal";

export default function ProfileHistory() {
  const [activeTab, setActiveTab] = useState("patungan");
  const [activities, setActivities] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [isEditCommunityOpen, setIsEditCommunityOpen] = useState(false);
  const [isDeleteCommunityOpen, setIsDeleteCommunityOpen] = useState(false);

  // Comment state for CommunityDetailModal
  const [communityComment, setCommunityComment] = useState("");

  const fetchData = async () => {
    setLoading(true);
    if (activeTab === "patungan") {
      const res = await api.history.getAll();
      if (res.success) setActivities(res.payload);
    } else {
      const res = await api.user.getCommunities();
      if (res.success) setCommunities(res.payload);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleReviewed = (activityId, reviewData) => {
    setActivities(prev => prev.map(act =>
      act.id === activityId ? { ...act, isReviewed: true, myReview: reviewData } : act
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

  const handleCommunityLike = async (id) => {
    await api.community.toggleLike({ id });
    fetchData();
  };

  const handleCommunityComment = async (id) => {
    const res = await api.community.addComment({ id, text: communityComment });
    if (res.success) {
      toast.success(res.message);
      setCommunityComment("");
      fetchData();
    } else {
      toast.error(res.message);
    }
  };

  const handleCommunityDelete = async () => {
    if (!selectedCommunity) return;
    const res = await api.community.delete({ id: selectedCommunity.id });
    if (res.success) {
      toast.success(res.message);
      setIsDeleteCommunityOpen(false);
      setSelectedCommunity(null);
      fetchData();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h3 className="font-bold text-base text-text-heading">{profileData.historyCard.title}</h3>
        <p className="text-xs text-text-muted">{profileData.historyCard.subtitle}</p>

        {/* Tabs */}
        <div className="flex gap-4 mt-4 border-b border-border-subtle">
          <button
            className={`pb-2 text-sm font-bold transition ${activeTab === 'patungan' ? 'text-primary-base border-b-2 border-primary-base' : 'text-text-muted hover:text-text-heading'}`}
            onClick={() => setActiveTab('patungan')}
          >
            Patungan
          </button>
          <button
            className={`pb-2 text-sm font-bold transition ${activeTab === 'komunitas' ? 'text-primary-base border-b-2 border-primary-base' : 'text-text-muted hover:text-text-heading'}`}
            onClick={() => setActiveTab('komunitas')}
          >
            Rekomendasi
          </button>
        </div>
      </div>

      <div className="space-y-1">
        {loading ? (
          <p className="text-xs text-text-muted text-center py-6">{profileData.historyCard.loadingText}</p>
        ) : activeTab === 'patungan' ? (
          activities.length > 0 ? (
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
          )
        ) : (
          communities.length > 0 ? (
            communities.map((act) => {
              const dateObj = new Date(act.createdAt || Date.now()); // fallback if missing
              const dateStr = dateObj.toLocaleDateString("id-ID", { day: '2-digit', month: 'short' }) + " " + dateObj.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' });
              return (
                <div
                  key={act.id}
                  onClick={() => setSelectedCommunity(act)}
                  className="py-2 border-b border-border-subtle last:border-0 flex flex-col gap-0 cursor-pointer hover:bg-bg-subtle transition px-2 -mx-2 rounded-lg"
                >
                  <h4 className="font-bold text-sm text-text-heading leading-relaxed truncate">
                    <span className="inline-flex items-center justify-center font-bold text-base align-middle mr-2 text-primary-base">
                      {getCategoryIcon(act.kategoriKey, "w-4 h-4 sm:w-5 sm:h-5")}
                    </span>
                    {act.judul}
                  </h4>
                  <div className="flex items-center justify-between mt-0">
                    <span className="font-bold text-[10px] sm:text-xs text-text-muted truncate mr-2">{act.lokasi}</span>
                    <span className="text-[10px] sm:text-xs text-text-muted whitespace-nowrap">
                      {dateStr}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-text-muted text-center py-6">Belum ada rekomendasi yang dibuat.</p>
          )
        )}
      </div>

      {selectedActivity && (
        ['OPEN', 'FULL', 'PENDING', 'ACCEPTED'].includes(selectedActivity.status) ? (
          <PatunganDetailModal
            item={{ ...selectedActivity, id: selectedActivity.patunganId }}
            onClose={() => setSelectedActivity(null)}
          />
        ) : (
          <HistoryDetailModal
            isOpen={!!selectedActivity}
            onClose={() => setSelectedActivity(null)}
            activity={selectedActivity}
            onReviewed={handleReviewed}
          />
        )
      )}

      <CommunityDetailModal
        item={selectedCommunity}
        onClose={() => setSelectedCommunity(null)}
        onAddComment={handleCommunityComment}
        onLike={handleCommunityLike}
        commentText={communityComment}
        setCommentText={setCommunityComment}
        onEdit={(item) => setIsEditCommunityOpen(true)}
      />

      {isEditCommunityOpen && selectedCommunity && (
        <CenterModalWrapper title="Edit Info Rekomendasi" onClose={() => setIsEditCommunityOpen(false)}>
          <CommunityForm
            initialData={selectedCommunity}
            onSuccess={() => {
              setIsEditCommunityOpen(false);
              fetchData();
              setSelectedCommunity(null); // Optional: close detail modal too, or let it refresh
            }}
            onDelete={() => {
              setIsEditCommunityOpen(false);
              setIsDeleteCommunityOpen(true);
            }}
          />
        </CenterModalWrapper>
      )}

      <ActionModal
        isOpen={isDeleteCommunityOpen}
        type="confirm"
        icon="warning"
        title="Hapus Rekomendasi"
        description="Tindakan ini tidak dapat dibatalkan. Rekomendasi ini akan dihapus secara permanen beserta komentar dan likes."
        confirmText="Hapus"
        cancelText="Batal"
        onConfirm={handleCommunityDelete}
        onCancel={() => setIsDeleteCommunityOpen(false)}
      />
    </>
  );
}
