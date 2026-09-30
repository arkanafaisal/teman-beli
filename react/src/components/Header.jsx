import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check initial dark mode from localStorage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
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
            <a href="/" className="text-blue-600 dark:text-blue-400 transition">Beranda</a>
            <a href="/eksplor" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Eksplor</a>
            <a href="/komunitas" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Komunitas</a>
            <a href="/profil" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Profil</a>
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

            <div className="hidden sm:block"></div>

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
            <a href="/" className="py-2 border-b border-slate-100 dark:border-slate-800 text-blue-600 dark:text-blue-400">Beranda</a>
            <a href="/eksplor" className="py-2 border-b border-slate-100 dark:border-slate-800 hover:text-blue-600 dark:hover:text-blue-400">Eksplor</a>
            <a href="/komunitas" className="py-2 border-b border-slate-100 dark:border-slate-800 hover:text-blue-600 dark:hover:text-blue-400">Komunitas</a>
            <a href="/profil" className="py-2 hover:text-blue-600 dark:hover:text-blue-400">Profil</a>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              <a href="/eksplor" className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition"> Masuk SSO Kampus </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
