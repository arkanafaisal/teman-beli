import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

function RedirectWithToast({ to, message }) {
  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]);

  return <Navigate to={to} replace />;
}

export function ProtectedAdminRoute() {
  const { user, isInitializing } = useAuth();

  // Tunggu pengecekan sesi selesai sebelum me-redirect agar tidak berkedip
  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-base">
        <div className="w-10 h-10 border-4 border-bg-subtle border-t-primary-base rounded-full animate-spin"></div>
      </div>
    );
  }

  // Cek apakah belum login, ATAU role-nya BUKAN ADMIN
  if (!user.isLoggedIn || user.role !== 'ADMIN') {
    // Redirect ke halaman depan jika bukan admin dengan notifikasi
    return <RedirectWithToast to="/" message="Akses Ditolak: Halaman khusus Admin." />;
  }

  // Jika ya ADMIN, izinkan akses rute-rute anak (children) di bawahnya
  return <Outlet />;
}

export function ProtectedUserRoute() {
  const { isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-base">
        <div className="w-10 h-10 border-4 border-bg-subtle border-t-primary-base rounded-full animate-spin"></div>
      </div>
    );
  }

  // Admin DIIZINKAN mengakses tampilan user biasa
  // Jadi komponen ini akan selalu merender isinya.
  return <Outlet />;
}
