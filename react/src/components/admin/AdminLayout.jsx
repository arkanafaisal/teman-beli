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
    <div className="flex min-h-screen relative overflow-x-hidden bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans antialiased transition-colors duration-200">
      {/* BACKDROP OVERLAY */}
      <div 
        onClick={toggleSidebar} 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'block' : 'hidden'}`}
      ></div>

      {/* SIDEBAR RESPONSIVE */}
      <aside 
        className={`fixed lg:static top-0 bottom-0 left-0 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700/60 flex flex-col shrink-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Brand Admin & Tombol Close Mobile */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/20">
              T
            </div>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white text-base leading-none">Teman Beli</h1>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Admin Workspace</span>
            </div>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
            <i className="ph ph-x text-xl"></i>
          </button>
        </div>

        {/* Menu Navigasi Admin */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <p className="px-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Utama</p>
          
          <a href="/admin" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition ${currentPath === '/admin' || currentPath === '/admin/' ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}>
            <i className="ph ph-squares-four text-lg"></i>
            Dashboard
          </a>

          <p className="px-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-5 mb-2">Kelola Konten</p>

          <a href="/admin/patungan" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition ${currentPath.includes('/admin/patungan') ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}>
            <i className="ph ph-handshake text-lg"></i>
            Patungan
          </a>

          <a href="/admin/pengguna" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition ${currentPath.includes('/admin/pengguna') ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}>
            <i className="ph ph-users text-lg"></i>
            Pengguna
          </a>

          <a href="/admin/ulasan" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition ${currentPath.includes('/admin/ulasan') ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}>
            <i className="ph ph-star text-lg"></i>
            Ulasan & Rating
          </a>

          <a href="/admin/komunitas" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition ${currentPath.includes('/admin/komunitas') ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}>
            <i className="ph ph-users-three text-lg"></i>
            Rekomendasi & Komunitas
          </a>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-700/60 space-y-1">
          <a href="/" className="flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition">
            <i className="ph ph-arrow-square-out text-base"></i>
            Lihat Tampilan User
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition">
            <i className="ph ph-sign-out text-base"></i>
            Keluar
          </a>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP HEADER */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/60 px-4 sm:px-8 py-4 flex justify-between items-center transition-colors duration-200">
          <div className="flex items-center gap-3">
            <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:ring-2 hover:ring-blue-500/50 transition">
              <i className="ph ph-list text-xl"></i>
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-5">
            <button onClick={toggleDarkMode} className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:ring-2 hover:ring-blue-500/50 transition group">
              <i className="ph ph-moon text-lg sm:text-xl dark:hidden block"></i>
              <i className="ph ph-sun text-lg sm:text-xl hidden dark:block"></i>
            </button>

            <div className="flex items-center gap-3 pl-3 sm:pl-4 border-l border-slate-200 dark:border-slate-700">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs sm:text-sm">
                BR
              </div>
              <div className="text-xs hidden sm:block">
                <p className="font-semibold text-slate-800 dark:text-slate-200">Baginda Ratu</p>
                <p className="text-slate-400">Super Admin</p>
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
