import React from 'react';

export default function PenggunaRow({ item, onDelete, onRestore }) {
  const isDeleted = item.isDeleted;

  return (
    <tr className="hover:bg-bg-subtle transition">
      <td className="px-6 py-4 flex items-center gap-3">
        <div>
          <p className="font-bold text-text-heading">{item.name}</p>
          <p className="text-[11px] text-text-muted">{item.email}</p>
        </div>
      </td>
      <td className="px-6 py-4 font-medium text-xs">{item.department || "-"}</td>
      <td className="px-6 py-4 font-semibold">{item.reviewCount || 0}</td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
          !isDeleted ? 'bg-success-soft text-success-text border border-success-subtle' :
          'bg-danger-soft text-danger-text border border-danger-subtle'
        }`}>{!isDeleted ? 'Aktif' : 'Dihapus'}</span>
      </td>
      <td className="px-6 py-4 text-right space-x-2">
        {!isDeleted ? (
          <button 
            onClick={() => onDelete && onDelete()}
            title="Hapus Pengguna"
            className="cursor-pointer p-2 text-text-muted hover:text-danger-base transition">
            <i className="ph ph-trash text-lg"></i>
          </button>
        ) : (
          <button 
            onClick={() => onRestore && onRestore()}
            title="Pulihkan Pengguna"
            className="cursor-pointer p-2 text-text-muted hover:text-success-base transition">
            <i className="ph ph-arrow-counter-clockwise text-lg"></i>
          </button>
        )}
      </td>
    </tr>
  );
}
