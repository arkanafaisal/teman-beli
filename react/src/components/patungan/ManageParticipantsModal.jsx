import { useState, useEffect } from "react";
import BottomModalWrapper from "../common/BottomModalWrapper";
import { patunganData } from "../../data/patungan";
import { api } from "../../services/api";
import { toast } from "sonner";
import { User, CheckCircle, XCircle } from "lucide-react";

export default function ManageParticipantsModal({ patunganId, onClose, onUpdate }) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const data = patunganData.manageParticipants;

  const fetchParticipants = async () => {
    setLoading(true);
    const res = await api.patungan.getParticipants(patunganId);
    if (res.success) {
      setParticipants(res.payload);
    } else {
      toast.error(res.message || "Gagal memuat partisipan");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchParticipants();
  }, [patunganId]);

  const handleUpdateStatus = async (participantId, newStatus) => {
    const res = await api.patungan.updateParticipantStatus(patunganId, participantId, newStatus);
    if (res.success) {
      toast.success(data.statusSuccess);
      fetchParticipants();
      if (onUpdate) onUpdate(); // To trigger parent refresh
    } else {
      toast.error(res.message || data.statusError);
    }
  };

  return (
    <BottomModalWrapper title={data.modalTitle} onClose={onClose}>
      <div className="p-4 sm:p-5">
        {loading ? (
          <div className="text-center py-8 text-text-muted text-sm font-medium animate-pulse">
            {data.loading}
          </div>
        ) : participants.length === 0 ? (
          <div className="text-center py-8">
            <User className="w-12 h-12 text-border-base mx-auto mb-3" />
            <p className="text-text-muted text-sm font-medium">{data.emptyState}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {participants.map((p) => (
              <div key={p.id} className="bg-bg-surface border border-border-base rounded-xl p-3 sm:p-4 shadow-sm flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-text-heading truncate">{p.user.name}</h4>
                  <p className="text-xs text-text-muted truncate mb-1">{p.user.email}</p>
                  <p className="text-xs font-semibold text-primary-text">{data.quotaLabel} {p.quota}</p>
                </div>
                
                <div className="flex-shrink-0">
                  {p.status === 'PENDING' ? (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleUpdateStatus(p.id, 'ACCEPTED')}
                        className="bg-success-base/10 text-success-base hover:bg-success-base hover:text-white p-2 rounded-lg transition"
                        title={data.acceptButton}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(p.id, 'REJECTED')}
                        className="bg-danger-base/10 text-danger-base hover:bg-danger-base hover:text-white p-2 rounded-lg transition"
                        title={data.rejectButton}
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  ) : p.status === 'ACCEPTED' ? (
                    <span className="inline-flex flex-col items-center justify-center bg-success-base/10 text-success-base px-2 py-1 rounded text-[10px] font-bold">
                      <CheckCircle className="w-3.5 h-3.5 mb-0.5" />
                      {data.acceptedLabel}
                    </span>
                  ) : (
                    <span className="inline-flex flex-col items-center justify-center bg-danger-base/10 text-danger-base px-2 py-1 rounded text-[10px] font-bold">
                      <XCircle className="w-3.5 h-3.5 mb-0.5" />
                      {data.rejectedLabel}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </BottomModalWrapper>
  );
}
