import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  
  const { user, login, logout } = useAuth();
  const currentPath = window.location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    ? "text-blue-600 dark:text-blue-400 transition font-bold" 
    : "hover:text-blue-600 dark:hover:text-blue-400 transition";

  const getMobileClass = (path) => isActive(path)
    ? "py-2 border-b border-slate-100 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-bold"
    : "py-2 border-b border-slate-100 dark:border-slate-800 hover:text-blue-600 dark:hover:text-blue-400";

  return (
    <>
      <div 
        className={`sticky top-0 z-50 w-full transition-all duration-300 px-4 sm:px-6 md:px-8 ${isScrolled ? 'pt-2' : 'pt-4 sm:pt-5'}`} 
        id="header-wrapper"
      >
        <header 
          id="main-header" 
          className={`${isScrolled ? 'max-w-4xl shadow-md h-14' : 'max-w-6xl h-16 shadow-sm'} mx-auto px-5 sm:px-8 flex items-center justify-between bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-2xl`}
        >
          {/* Brand Logo */}
          <a href="/" className="flex items-center gap-2 font-extrabold text-lg sm:text-xl tracking-tight text-blue-600 dark:text-blue-400">
            <span className="p-1.5 bg-blue-100 dark:bg-blue-950/80 rounded-xl text-base sm:text-lg">🎓</span>
            <span>Patungan<span className="text-slate-900 dark:text-white">Aja!</span></span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
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
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition" 
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
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Hi, {user.name} <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full font-semibold">Verified</span>
                  </span>
                  <button onClick={logout} className="text-xs text-red-500 hover:underline">Keluar</button>
                </div>
              ) : (
                <button onClick={login} className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition">
                  Masuk SSO Kampus
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none active:scale-95 transition" 
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
        <div className="fixed inset-x-4 top-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-6 z-40 md:hidden shadow-2xl transition-all duration-300">
          <nav className="flex flex-col gap-4 text-base font-semibold text-slate-700 dark:text-slate-200">
            <a href="/" className={getMobileClass("/")}>Beranda</a>
            <a href="/eksplor" className={getMobileClass("/eksplor")}>Eksplor</a>
            <a href="/komunitas" className={getMobileClass("/komunitas")}>Komunitas</a>
            <a href="/profil" className={getMobileClass("/profil")}>Profil</a>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              {user.isLoggedIn ? (
                <button onClick={logout} className="w-full text-center bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl shadow-md transition"> Keluar </button>
              ) : (
                <button onClick={login} className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition"> Masuk SSO Kampus </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
