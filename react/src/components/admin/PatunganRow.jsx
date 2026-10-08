import React from 'react';

export default function PatunganRow({ item }) {
  return (
    <tr className="hover:bg-bg-subtle transition">
      <td className="px-6 py-4">
        <p className="font-bold text-text-heading">{item.name}</p>
        <p className="text-[11px] text-text-muted">Penggagas: {item.author}</p>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
          item.category === 'Digital' ? 'bg-primary-soft text-primary-text border border-primary-soft' :
          'bg-warning-soft text-warning-text border border-warning-subtle'
        }`}>{item.category}</span>
      </td>
      <td className="px-6 py-4 font-semibold text-text-heading">Rp {item.price.toLocaleString('id-ID')}</td>
      <td className="px-6 py-4 w-48">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-medium text-text-base dark:text-text-muted">{item.currentSlot}/{item.targetSlot} Slot</span>
          <span className="font-bold text-primary-base">{item.progress}%</span>
        </div>
        <div className="w-full bg-bg-subtle h-2 rounded-full overflow-hidden">
          <div className="bg-primary-base h-full" style={{ width: `${item.progress}%` }}></div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
          item.status === 'Berjalan' ? 'bg-primary-soft text-primary-text border border-primary-soft' :
          'bg-bg-subtle text-text-base border border-border-hover'
        }`}>{item.status}</span>
      </td>
      <td className="px-6 py-4 text-right space-x-2">
        <button className="p-2 text-text-muted hover:text-primary-base transition"><i className="ph ph-pencil text-lg"></i></button>
        <button className="p-2 text-text-muted hover:text-danger-base transition"><i className="ph ph-trash text-lg"></i></button>
      </td>
    </tr>
  );
}
