import React from 'react';
import { adminData } from '../../data/admin';

export default function PenggunaRow({ item }) {
  const isVerified = item.status === adminData.pengguna.status.verified;
  return (
    <tr className="hover:bg-bg-subtle transition">
      <td className="px-6 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-bg-subtle font-bold text-text-base flex items-center justify-center text-xs">{item.initial}</div>
        <div>
          <p className="font-bold text-text-heading">{item.name}</p>
          <p className="text-[11px] text-text-muted">{item.email}</p>
        </div>
      </td>
      <td className="px-6 py-4 font-medium text-xs">{item.program}</td>
      <td className="px-6 py-4 font-semibold">{item.totalPatungan} Ikut</td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
          isVerified ? 'bg-primary-soft text-primary-text border border-primary-soft' :
          'bg-warning-soft text-warning-text border border-warning-subtle'
        }`}>{item.status}</span>
      </td>
      <td className="px-6 py-4 text-right space-x-2">
        {isVerified ? (
          <>
            <button className="cursor-pointer text-xs text-primary-text font-semibold hover:underline">{adminData.pengguna.actions.detail}</button>
            <button className="cursor-pointer text-xs text-danger-base font-semibold hover:underline">{adminData.pengguna.actions.suspend}</button>
          </>
        ) : (
          <>
            <button className="cursor-pointer text-xs text-primary-base font-semibold hover:underline">{adminData.pengguna.actions.verify}</button>
            <button className="cursor-pointer text-xs text-text-muted font-semibold hover:underline">{adminData.pengguna.actions.detail}</button>
          </>
        )}
      </td>
    </tr>
  );
}
