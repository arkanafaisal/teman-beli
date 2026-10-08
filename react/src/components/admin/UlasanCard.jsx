import React from 'react';
import { adminData } from '../../data/admin';

export default function UlasanCard({ item }) {
  return (
    <div className="bg-bg-surface p-5 rounded-2xl border border-border-base shadow-sm space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-soft text-primary-text font-bold flex items-center justify-center text-xs">{item.initial}</div>
          <div>
            <p className="font-bold text-text-heading text-xs">{item.name}</p>
            <p className="text-[10px] text-text-muted">{item.context}</p>
          </div>
        </div>
        <span className="text-warning-base font-bold text-xs">{item.ratingText}</span>
      </div>
      <p className="text-xs text-text-base">{item.review}</p>
      <div className="pt-2 border-t border-border-subtle flex justify-end gap-3 text-xs">
        <button className="text-primary-base font-semibold hover:underline"><i className="ph ph-check mr-1"></i> {adminData.ulasan.actions.show}</button>
        <button className="text-danger-base font-semibold hover:underline"><i className="ph ph-trash mr-1"></i> {adminData.ulasan.actions.hide}</button>
      </div>
    </div>
  );
}
