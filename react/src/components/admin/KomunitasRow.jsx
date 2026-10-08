import React from 'react';
import { adminData } from '../../data/admin';

export default function KomunitasRow({ item, onConfirmToggle }) {
  const data = adminData.komunitas;
  return (
    <tr className={`hover:bg-bg-subtle transition ${!item.isActive ? 'opacity-75' : ''}`}>
      <td className="px-4 sm:px-6 py-4">
        <p className="font-bold text-text-heading line-clamp-1">{item.title}</p>
        <p className="text-[10px] sm:text-[11px] text-text-muted">ID: {item.id}</p>
      </td>
      <td className="px-3 sm:px-4 py-4">
        <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap ${
          item.category === 'Kebutuhan Kampus' ? 'bg-primary-soft text-primary-text border border-primary-ring/30' :
          item.category === 'Buku & Catatan' ? 'bg-warning-soft text-warning-text border border-warning-base/30' :
          'bg-bg-subtle text-text-muted border border-border-base'
        }`}>{item.category}</span>
      </td>
      <td className="px-3 sm:px-4 py-4 font-medium text-text-base">
        <span className="inline-flex items-center gap-1"><i className="ph ph-map-pin text-text-muted"></i> {item.location}</span>
      </td>
      <td className="px-3 sm:px-4 py-4 font-medium text-text-heading whitespace-nowrap">
        {item.author}
      </td>
      <td className="px-3 sm:px-4 py-4 text-xs text-text-muted whitespace-nowrap">
        <span className="inline-flex items-center gap-1 mr-2"><i className="ph ph-heart text-danger-base"></i> {item.likes}</span>
        <span className="inline-flex items-center gap-1"><i className="ph ph-chat-teardrop-dots text-primary-base"></i> {item.comments}</span>
      </td>
      <td className="px-3 sm:px-4 py-4 whitespace-nowrap">
        {item.isActive ? (
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-success-soft text-success-text border border-success-base/30">{data.status.active}</span>
        ) : (
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-bg-subtle text-text-muted border border-border-base">{data.status.inactive}</span>
        )}
      </td>
      <td className="px-3 sm:px-4 py-4 text-center whitespace-nowrap">
        <button 
          onClick={() => onConfirmToggle(item.title, item.isActive, item.id)} 
          className={`p-1.5 sm:p-2 rounded-lg transition ${
            item.isActive 
              ? 'text-text-base hover:text-primary-text hover:bg-bg-subtle' 
              : 'text-text-muted hover:text-primary-text hover:bg-bg-subtle'
          }`}
          title={item.isActive ? data.actions.hide : data.actions.show}
        >
          <i className={item.isActive ? "ph ph-eye text-lg sm:text-xl" : "ph ph-eye-slash text-lg sm:text-xl"}></i>
        </button>
      </td>
    </tr>
  );
}
