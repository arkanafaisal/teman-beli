import React from 'react';

export default function PatunganRow({ item, onCancel, onRestore }) {
  const percent = Math.min(100, Math.round((item.currentQuota / item.targetQuota) * 100));

  const getStatusColor = (status) => {
    switch(status) {
      case 'OPEN': return 'bg-success-soft text-success-text border border-success-subtle';
      case 'FULL': return 'bg-success-soft text-success-text border border-success-subtle';
      case 'CANCELLED': return 'bg-danger-soft text-danger-text border border-danger-subtle';
      case 'FINISHED': return 'bg-bg-subtle text-text-muted border border-border-hover';
      default: return 'bg-bg-subtle text-text-base border border-border-hover';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'DIGITAL': return 'bg-primary-soft text-primary-text border border-primary-soft';
      case 'PANGAN': return 'bg-success-soft text-success-text border border-success-subtle';
      case 'KOS': return 'bg-warning-soft text-warning-text border border-warning-subtle';
      case 'KAMPUS': return 'bg-info-soft text-info-text border border-info-subtle';
      default: return 'bg-bg-subtle text-text-base border border-border-hover';
    }
  };

  return (
    <tr className="hover:bg-bg-subtle transition">
      <td className="px-6 py-4">
        <p className="font-bold text-text-heading">{item.title}</p>
        <p className="text-[11px] text-text-muted">Penggagas: {item.host?.name || "Unknown"}</p>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
          {item.category}
        </span>
      </td>
      <td className="px-6 py-4 font-semibold text-text-heading">Rp {(item.totalPrice || 0).toLocaleString('id-ID')}</td>
      <td className="px-6 py-4 w-48">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-medium text-text-base dark:text-text-muted">{item.currentQuota}/{item.targetQuota} {item.unit || 'Slot'}</span>
          <span className="font-bold text-primary-base">{percent}%</span>
        </div>
        <div className="w-full bg-bg-subtle h-2 rounded-full overflow-hidden">
          <div className="bg-primary-base h-full" style={{ width: `${percent}%` }}></div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
          {{
            'OPEN': 'Berjalan',
            'FULL': 'Berjalan',
            'FINISHED': 'Selesai',
            'CANCELLED': 'Dihapus'
          }[item.status] || item.status}
        </span>
      </td>
      <td className="px-6 py-4 text-right space-x-2">
        {item.status === 'CANCELLED' && (
          <button 
            onClick={() => {
              if (onRestore) onRestore();
            }}
            title="Pulihkan Patungan"
            className="cursor-pointer p-2 text-text-muted hover:text-success-base transition">
            <i className="ph ph-arrow-counter-clockwise text-lg"></i>
          </button>
        )}
        <button 
          onClick={() => {
            if (onCancel) onCancel();
          }}
          title="Batalkan Patungan"
          className="cursor-pointer p-2 text-text-muted hover:text-danger-base transition">
          <i className="ph ph-trash text-lg"></i>
        </button>
      </td>
    </tr>
  );
}
