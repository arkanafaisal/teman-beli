import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { adminData } from '../../data/admin';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { toast } from 'sonner';

export default function AdminLayout({ children, title = adminData.dashboard.title }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, logout } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    await api.auth.logout();
    logout();
    toast.info("Anda telah keluar dari sesi admin.");
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
        className={`fixed lg:static top-0 bottom-0 left-0 w-60 bg-bg-surface border-r border-border-base flex flex-col shrink-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Brand Admin */}
        <div className="p-6 border-b border-border-subtle flex items-center justify-between">
          <div>
            <h1 className="font-bold text-text-heading text-base leading-none">{adminData.layout.sidebar.brand}</h1>
            <span className="text-xs text-primary-text font-medium">{adminData.layout.sidebar.workspace}</span>
          </div>
        </div>

        {/* Menu Navigasi Admin */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <p className="px-4 text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">{adminData.layout.sidebar.menuSection1}</p>
          
          <Link to="/admin" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition ${currentPath === '/admin' || currentPath === '/admin/' ? 'bg-primary-soft text-primary-text font-semibold' : 'text-text-base hover:bg-bg-subtle'}`}>
            <i className="ph ph-squares-four text-lg"></i>
            {adminData.layout.sidebar.dashboard}
          </Link>

          <p className="px-4 text-[10px] font-semibold text-text-muted uppercase tracking-wider mt-5 mb-2">{adminData.layout.sidebar.menuSection2}</p>

          <Link to="/admin/patungan" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition ${currentPath.includes('/admin/patungan') ? 'bg-primary-soft text-primary-text font-semibold' : 'text-text-base hover:bg-bg-subtle'}`}>
            <i className="ph ph-handshake text-lg"></i>
            {adminData.layout.sidebar.patungan}
          </Link>

          <Link to="/admin/pengguna" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition ${currentPath.includes('/admin/pengguna') ? 'bg-primary-soft text-primary-text font-semibold' : 'text-text-base hover:bg-bg-subtle'}`}>
            <i className="ph ph-users text-lg"></i>
            {adminData.layout.sidebar.pengguna}
          </Link>

          <Link to="/admin/ulasan" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition ${currentPath.includes('/admin/ulasan') ? 'bg-primary-soft text-primary-text font-semibold' : 'text-text-base hover:bg-bg-subtle'}`}>
            <i className="ph ph-star text-lg"></i>
            {adminData.layout.sidebar.ulasan}
          </Link>

          <Link to="/admin/komunitas" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition ${currentPath.includes('/admin/komunitas') ? 'bg-primary-soft text-primary-text font-semibold' : 'text-text-base hover:bg-bg-subtle'}`}>
            <i className="ph ph-users-three text-lg"></i>
            {adminData.layout.sidebar.komunitas}
          </Link>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border-subtle space-y-3">
          <Link to="/" className="flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium text-text-muted hover:text-text-heading transition">
            <i className="ph ph-arrow-square-out text-base"></i>
            {adminData.layout.sidebar.backToApp}
          </Link>
          
          <div className="relative">
            {isProfilePopupOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfilePopupOpen(false)}
                ></div>
                <div className="absolute bottom-full left-0 w-full mb-2 bg-bg-surface border border-border-base rounded-xl shadow-lg z-50 p-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <button onClick={handleLogout} className="cursor-pointer w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold bg-danger-base text-white hover:bg-red-600 transition shadow-md shadow-danger-base/20">
                    <i className="ph ph-sign-out text-base"></i>
                    {adminData.layout.sidebar.logout}
                  </button>
                </div>
              </>
            )}
            <button 
              onClick={() => setIsProfilePopupOpen(!isProfilePopupOpen)}
              className="w-full bg-bg-surface shadow-sm hover:bg-bg-subtle active:scale-[0.98] ring-1 ring-border-base p-2.5 rounded-xl flex items-center justify-between transition cursor-pointer"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-primary-soft text-primary-text font-bold flex items-center justify-center text-xs shrink-0">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="text-xs truncate text-left">
                  <p className="font-semibold text-text-base truncate">{user?.name || 'Admin'}</p>
                  <p className="text-[10px] text-text-muted truncate">{user?.email || 'admin@temanbeli.com'}</p>
                </div>
              </div>
              <i className="ph ph-caret-up text-text-muted shrink-0 mr-1"></i>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP HEADER */}
        <header className="bg-bg-surface border-b border-border-base px-4 sm:px-8 py-4 flex justify-between items-center transition-colors duration-200">
          <div className="flex items-center gap-3">
            <button onClick={toggleSidebar} className="cursor-pointer lg:hidden p-2 flex items-center justify-center rounded-xl bg-bg-subtle text-text-base hover:ring-2 hover:ring-primary-ring/50 transition">
              <i className="ph ph-list text-xl leading-none"></i>
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-text-heading">{title}</h2>
          </div>

          <div className="flex items-center">
            <button onClick={toggleDarkMode} className="cursor-pointer p-2 sm:p-2.5 flex items-center justify-center rounded-xl bg-bg-subtle text-text-base hover:ring-2 hover:ring-primary-ring/50 transition group">
              <i className="ph ph-moon text-lg sm:text-xl leading-none dark:hidden block"></i>
              <i className="ph ph-sun text-lg sm:text-xl leading-none hidden dark:block"></i>
            </button>
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
