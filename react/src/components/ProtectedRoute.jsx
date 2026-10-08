import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
    // Redirect ke halaman depan jika bukan admin
    return <Navigate to="/" replace />;
  }

  // Jika ya ADMIN, izinkan akses rute-rute anak (children) di bawahnya
  return <Outlet />;
}

export function ProtectedUserRoute() {
  const { user, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-base">
        <div className="w-10 h-10 border-4 border-bg-subtle border-t-primary-base rounded-full animate-spin"></div>
      </div>
    );
  }

  // Jika ADMIN yang mencoba mengakses rute non-admin (halaman utama dll),
  // Maka paksa redirect ke /admin agar tidak tersesat
  if (user.isLoggedIn && user.role === 'ADMIN') {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
