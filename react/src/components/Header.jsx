import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const { user, login, logout } = useAuth();
  const currentPath = window.location.pathname;

  useEffect(() => {
    // Scrolling logic removed as requested, navbar is permanently in compact state
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const isActive = (path) => {
    if (path === '/') return currentPath === '/' || currentPath === '/index.html';
    return currentPath.startsWith(path);
  };

  const getDesktopClass = (path) => isActive(path)
    ? "text-primary-text transition font-bold"
    : "hover:text-primary-text transition";

  const getMobileClass = (path) => isActive(path)
    ? "py-2 border-b border-border-subtle text-primary-text font-bold"
    : "py-2 border-b border-border-subtle hover:text-primary-text";

  return (
    <>
      <div
        className="sticky top-0 z-50 w-full transition-all duration-300 px-4 sm:px-6 md:px-8 pt-2"
        id="header-wrapper"
      >
        <header
          id="main-header"
          className="max-w-4xl shadow-md h-14 mx-auto px-5 sm:px-8 flex items-center justify-between bg-bg-glass backdrop-blur-md border border-border-subtle rounded-2xl"
        >
          {/* Brand Logo */}
          <a href="/" className="flex items-center gap-2 font-extrabold text-lg sm:text-xl tracking-tight text-primary-text">
            <span className="p-1.5 bg-primary-soft rounded-xl text-base sm:text-lg">🎓</span>
            <span>Patungan<span className="text-text-heading">Aja!</span></span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-text-muted">
            <a href="/" className={getDesktopClass("/")}>Beranda</a>
            <a href="/eksplor" className={getDesktopClass("/eksplor")}>Eksplor</a>
            <a href="/komunitas" className={getDesktopClass("/komunitas")}>Komunitas</a>
            <a href="/profil" className={getDesktopClass("/profil")}>Profil</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl bg-bg-subtle text-text-muted hover:bg-border-hover active:scale-95 transition"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <span className="text-sm sm:text-base">☀️</span>
              ) : (
                <span className="text-sm sm:text-base">🌙</span>
              )}
            </button>

            <div className="hidden sm:block">
              {user.isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-text-base">
                    Hi, {user.name} <span className="bg-primary-soft text-primary-hover text-xs px-2 py-0.5 rounded-full font-semibold">Verified</span>
                  </span>
                  <button onClick={logout} className="text-xs text-danger-text hover:underline">Keluar</button>
                </div>
              ) : (
                <button onClick={login} className="bg-primary-base hover:bg-primary-hover text-text-inverted text-sm px-4 py-2 rounded-lg font-medium transition">
                  Masuk SSO Kampus
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-bg-subtle text-text-base focus:outline-none active:scale-95 transition"
              aria-label="Open Menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              )}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 bg-bg-glass backdrop-blur-xl border border-border-subtle rounded-2xl p-6 z-40 md:hidden shadow-2xl transition-all duration-300">
          <nav className="flex flex-col gap-4 text-base font-semibold text-text-base">
            <a href="/" className={getMobileClass("/")}>Beranda</a>
            <a href="/eksplor" className={getMobileClass("/eksplor")}>Eksplor</a>
            <a href="/komunitas" className={getMobileClass("/komunitas")}>Komunitas</a>
            <a href="/profil" className={getMobileClass("/profil")}>Profil</a>

            <div className="pt-4 border-t border-border-subtle flex flex-col gap-3">
              {user.isLoggedIn ? (
                <button onClick={logout} className="w-full text-center bg-danger-base hover:bg-danger-hover text-text-inverted font-semibold py-3 rounded-xl shadow-md transition"> Keluar </button>
              ) : (
                <button onClick={login} className="w-full text-center bg-primary-base hover:bg-primary-hover text-text-inverted font-semibold py-3 rounded-xl shadow-md transition"> Masuk SSO Kampus </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
