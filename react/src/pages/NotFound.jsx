import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NotFound() {
  const { user } = useAuth();
  const location = useLocation();

  // Menentukan route kembali berdasarkan role
  const isAdminPath = location.pathname.startsWith('/admin');
  const isUserAdmin = user?.role === 'ADMIN';

  let backLink = '/';
  let backText = 'Kembali ke Beranda';

  if (isAdminPath || isUserAdmin) {
    backLink = '/admin';
    backText = 'Kembali ke Dashboard Admin';
  }

  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-bg-surface p-10 rounded-[32px] shadow-sm border border-border-base">
        <div className="w-24 h-24 bg-danger-base text-text-inverted rounded-3xl flex items-center justify-center mx-auto mb-6">
          <i className="ph ph-warning-circle text-5xl"></i>
        </div>

        <div>
          <h1 className="text-4xl font-extrabold text-text-heading mb-2 tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-text-base mb-3">Halaman Tidak Ditemukan</h2>
          <p className="text-text-muted text-sm leading-relaxed">
            Maaf, halaman <span className="font-mono bg-bg-subtle px-2 py-0.5 rounded text-primary-text">{location.pathname}</span> yang Anda cari tidak ada atau mungkin sudah dipindahkan.
          </p>
        </div>

        <div className="pt-4">
          <Link
            to={backLink}
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-primary-base hover:bg-primary-hover text-white rounded-2xl font-bold transition shadow-lg shadow-primary-ring/30"
          >
            {/* <i className="ph ph-house text-lg"></i> */}
            {backText}
          </Link>
        </div>
      </div>
    </div>
  );
}
