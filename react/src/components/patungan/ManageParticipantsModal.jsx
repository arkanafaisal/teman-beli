import { useState, useEffect } from "react";
import BottomModalWrapper from "../common/BottomModalWrapper";
import ActionModal from "../common/ActionModal";
import { patunganData } from "../../data/patungan";
import { api } from "../../services/api";
import { toast } from "sonner";
import { User, CheckCircle, XCircle, Trash2 } from "lucide-react";

export default function ManageParticipantsModal({ patunganId, hostId, onClose, onUpdate }) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [participantToDelete, setParticipantToDelete] = useState(null);
  
  const data = patunganData.manageParticipants;

  const fetchParticipants = async () => {
    setLoading(true);
    const res = await api.patungan.getParticipants({ id: patunganId });
    if (res.success) {
      setParticipants(res.payload);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchParticipants();
  }, [patunganId]);

  const handleUpdateStatus = async (participantId, newStatus) => {
    const res = await api.patungan.updateParticipantStatus({ id: patunganId, participantId, status: newStatus });
    if (res.success || !res.message) {
      toast.success(data.statusSuccess);
      fetchParticipants();
      if (onUpdate) onUpdate(); // To trigger parent refresh
    } else {
      toast.error(res.message);
    }
  };

  const confirmDelete = (participantId) => {
    setParticipantToDelete(participantId);
  };

  const executeDelete = async () => {
    if (!participantToDelete) return;
    const res = await api.patungan.deleteParticipant({ id: patunganId, participantId: participantToDelete });
    if (res.success || !res.message) {
      toast.success(data.deleteSuccess);
      fetchParticipants();
      if (onUpdate) onUpdate();
    } else {
      toast.error(res.message);
    }
    setParticipantToDelete(null);
  };

  return (
    <>
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
              <div key={p.id} className={`border border-border-base rounded-xl p-3 sm:p-4 shadow-sm flex items-center justify-between gap-3 ${p.status === 'REJECTED' ? 'bg-danger-base/10' : 'bg-bg-surface'}`}>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-text-heading truncate flex items-center gap-2">
                    {p.user.name} 
                    {p.user.id === hostId && <span className="text-[10px] bg-primary-base text-white px-2 py-0.5 rounded-full">Host</span>}
                  </h4>
                  <p className="text-xs text-text-muted truncate mb-1">{p.user.email}</p>
                  <p className="text-xs font-semibold text-primary-text">{data.quotaLabel} {p.quota}</p>
                </div>
                
                <div className="flex-shrink-0">
                  {p.user.id !== hostId && (
                    <>
                      {p.status === 'PENDING' ? (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleUpdateStatus(p.id, 'ACCEPTED')}
                            className="bg-success-base text-white p-2 rounded-lg transition cursor-pointer"
                            title={data.acceptButton}
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(p.id, 'REJECTED')}
                            className="bg-danger-base text-white p-2 rounded-lg transition cursor-pointer"
                            title={data.rejectButton}
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      ) : p.status === 'ACCEPTED' ? (
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => confirmDelete(p.id)}
                            className="text-text-muted hover:text-danger-base transition p-1 cursor-pointer"
                            title={data.deleteButton}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-danger-base text-[10px] font-bold">
                            {data.rejectedLabel}
                          </span>
                          <button 
                            onClick={() => confirmDelete(p.id)}
                            className="text-text-muted hover:text-danger-base transition p-1 cursor-pointer"
                            title={data.deleteButton}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </BottomModalWrapper>
      
      <ActionModal
        isOpen={!!participantToDelete}
        type="confirm"
        icon="warning"
        title="Hapus Partisipan"
        description="Yakin ingin menghapus partisipan ini? Kuota akan dikembalikan jika partisipan ini sudah diterima."
        confirmText="Hapus"
        cancelText="Batal"
        onConfirm={executeDelete}
        onCancel={() => setParticipantToDelete(null)}
      />
    </>
  );
}
