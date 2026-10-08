import React from 'react';
import { adminData } from '../../data/admin';

export default function KomunitasRow({ item, onCancel, onRestore }) {
  const data = adminData.komunitas;
  return (
    <tr className={`hover:bg-bg-subtle transition ${!item.isActive ? 'opacity-75' : ''}`}>
      <td className="px-4 sm:px-6 py-4">
        <p className="font-bold text-text-heading line-clamp-1">{item.judul}</p>
        <p className="text-[10px] sm:text-[11px] text-text-muted">ID: {item.id}</p>
      </td>
      <td className="px-3 sm:px-4 py-4">
        <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap ${
          item.kategoriKey === 'KAMPUS' ? 'bg-primary-soft text-primary-text border border-primary-ring/30' :
          item.kategoriKey === 'KOS' ? 'bg-warning-soft text-warning-text border border-warning-base/30' :
          'bg-success-soft text-success-text border border-success-base/30'
        }`}>{item.kategoriKey}</span>
      </td>
      <td className="px-3 sm:px-4 py-4 font-medium text-text-base">
        <span className="inline-flex items-center gap-1"><i className="ph ph-map-pin text-text-muted"></i> {item.lokasi}</span>
      </td>
      <td className="px-3 sm:px-4 py-4 font-medium text-text-heading whitespace-nowrap">
        {item.author}
      </td>
      <td className="px-3 sm:px-4 py-4 text-xs text-text-muted whitespace-nowrap">
        <span className="inline-flex items-center gap-1 mr-2"><i className="ph ph-heart text-danger-base"></i> {item.likes}</span>
        <span className="inline-flex items-center gap-1"><i className="ph ph-chat-teardrop-dots text-primary-base"></i> {Array.isArray(item.comments) ? item.comments.length : item.comments}</span>
      </td>
      <td className="px-3 sm:px-4 py-4 whitespace-nowrap">
        {item.isActive ? (
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-success-soft text-success-text border border-success-base/30">{data.status.active}</span>
        ) : (
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-bg-subtle text-text-muted border border-border-base">{data.status.inactive}</span>
        )}
      </td>
      <td className="px-3 sm:px-4 py-4 text-center whitespace-nowrap space-x-2">
        {!item.isActive ? (
          <button 
            onClick={() => {
              if (onRestore) onRestore();
            }}
            title="Pulihkan Komunitas"
            className="cursor-pointer p-2 text-text-muted hover:text-success-base transition">
            <i className="ph ph-arrow-counter-clockwise text-lg"></i>
          </button>
        ) : (
          <button 
            onClick={() => {
              if (onCancel) onCancel();
            }}
            title="Nonaktifkan Komunitas"
            className="cursor-pointer p-2 text-text-muted hover:text-danger-base transition">
            <i className="ph ph-trash text-lg"></i>
          </button>
        )}
      </td>
    </tr>
  );
}
