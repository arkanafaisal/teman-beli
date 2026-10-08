import React, { useState, useEffect } from 'react';

export default function AdminLayout({ children, title = "Panel Administrasi" }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentPath = window.location.pathname;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    const htmlClass = document.documentElement.classList;
    if (htmlClass.contains('dark')) {
      htmlClass.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      htmlClass.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    // Note: Theme toggle icon update will be handled by CSS or state if needed, 
    // but here we can just force a re-render or let it be handled globally if possible.
    // For simplicity, we'll just let the class change.
  };

  return (
    <div className="flex min-h-screen relative overflow-x-hidden bg-bg-base text-text-base font-sans antialiased transition-colors duration-200">
      {/* BACKDROP OVERLAY */}
      <div 
        onClick={toggleSidebar} 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'block' : 'hidden'}`}
      ></div>

      {/* SIDEBAR RESPONSIVE */}
      <aside 
        className={`fixed lg:static top-0 bottom-0 left-0 w-64 bg-bg-surface border-r border-border-base flex flex-col shrink-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Brand Admin & Tombol Close Mobile */}
        <div className="p-6 border-b border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-base flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-ring/20">
              T
            </div>
            <div>
              <h1 className="font-bold text-text-heading text-base leading-none">Teman Beli</h1>
              <span className="text-xs text-primary-text font-medium">Admin Workspace</span>
            </div>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden p-1.5 rounded-lg text-text-muted hover:text-text-heading hover:bg-bg-subtle">
            <i className="ph ph-x text-xl"></i>
          </button>
        </div>

        {/* Menu Navigasi Admin */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <p className="px-4 text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">Utama</p>
          
          <a href="/admin" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition ${currentPath === '/admin' || currentPath === '/admin/' ? 'bg-primary-soft text-primary-text font-semibold' : 'text-text-base hover:bg-bg-subtle'}`}>
            <i className="ph ph-squares-four text-lg"></i>
            Dashboard
          </a>

          <p className="px-4 text-[10px] font-semibold text-text-muted uppercase tracking-wider mt-5 mb-2">Kelola Konten</p>

          <a href="/admin/patungan" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition ${currentPath.includes('/admin/patungan') ? 'bg-primary-soft text-primary-text font-semibold' : 'text-text-base hover:bg-bg-subtle'}`}>
            <i className="ph ph-handshake text-lg"></i>
            Patungan
          </a>

          <a href="/admin/pengguna" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition ${currentPath.includes('/admin/pengguna') ? 'bg-primary-soft text-primary-text font-semibold' : 'text-text-base hover:bg-bg-subtle'}`}>
            <i className="ph ph-users text-lg"></i>
            Pengguna
          </a>

          <a href="/admin/ulasan" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition ${currentPath.includes('/admin/ulasan') ? 'bg-primary-soft text-primary-text font-semibold' : 'text-text-base hover:bg-bg-subtle'}`}>
            <i className="ph ph-star text-lg"></i>
            Ulasan & Rating
          </a>

          <a href="/admin/komunitas" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition ${currentPath.includes('/admin/komunitas') ? 'bg-primary-soft text-primary-text font-semibold' : 'text-text-base hover:bg-bg-subtle'}`}>
            <i className="ph ph-users-three text-lg"></i>
            Rekomendasi & Komunitas
          </a>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border-subtle space-y-1">
          <a href="/" className="flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium text-text-muted hover:text-text-heading dark:text-text-muted dark:hover:text-white transition">
            <i className="ph ph-arrow-square-out text-base"></i>
            Lihat Tampilan User
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium text-danger-base hover:bg-danger-soft transition">
            <i className="ph ph-sign-out text-base"></i>
            Keluar
          </a>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP HEADER */}
        <header className="bg-bg-surface border-b border-border-base px-4 sm:px-8 py-4 flex justify-between items-center transition-colors duration-200">
          <div className="flex items-center gap-3">
            <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-xl bg-bg-subtle text-text-base hover:ring-2 hover:ring-primary-ring/50 transition">
              <i className="ph ph-list text-xl"></i>
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-text-heading">{title}</h2>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-5">
            <button onClick={toggleDarkMode} className="p-2 sm:p-2.5 rounded-xl bg-bg-subtle text-text-base hover:ring-2 hover:ring-primary-ring/50 transition group">
              <i className="ph ph-moon text-lg sm:text-xl dark:hidden block"></i>
              <i className="ph ph-sun text-lg sm:text-xl hidden dark:block"></i>
            </button>

            <div className="flex items-center gap-3 pl-3 sm:pl-4 border-l border-border-base">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary-soft text-primary-text font-bold flex items-center justify-center text-xs sm:text-sm">
                BR
              </div>
              <div className="text-xs hidden sm:block">
                <p className="font-semibold text-text-base">Baginda Ratu</p>
                <p className="text-text-muted">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTAINER CONTENT */}
        <main className="p-4 sm:p-8 space-y-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
