import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { appData } from "../data/app";
import LogoIcon from "./LogoIcon";
import Badge from "./Badge";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const { user, login, logout } = useAuth();
  const currentPath = window.location.pathname;

  const handleLogin = () => {
    // Simulasi pop-up Google OAuth & verifikasi domain
    const confirmGoogle = window.confirm("Membuka pop-up Google Auth... (Simulasi)\n\nPilih 'OK' jika Anda menggunakan email @*.ac.id\nPilih 'Cancel' jika gagal/email salah.");
    
    if (confirmGoogle) {
      alert("Login Berhasil! Domain email kampus terverifikasi.");
      login();
    } else {
      alert("Login Gagal: Akun tidak menggunakan email kampus (.ac.id) atau otorisasi dibatalkan.");
    }
  };

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
        className="sticky top-0 z-50 w-full bg-bg-glass backdrop-blur-md border-b border-border-subtle shadow-sm"
        id="header-wrapper"
      >
        <header
          id="main-header"
          className="max-w-6xl h-16 mx-auto px-5 sm:px-8 flex items-center justify-between"
        >
          <a href="/" className="flex items-center gap-2.5 font-extrabold text-xl lg:text-2xl tracking-tight text-primary-text">
            <LogoIcon className="w-7 h-7 sm:w-8 sm:h-8 text-primary-base -translate-y-0.5" />
            <span>
              <span className="text-primary-text">{appData.brand.nameHighlight}</span>
              <span className="text-text-heading">{appData.brand.nameNormal}</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 lg:gap-8 text-base font-medium text-text-muted">
            {appData.header.navLinks.map((link) => (
              <a key={link.path} href={link.path} className={getDesktopClass(link.path)}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="cursor-pointer p-2 rounded-xl text-text-muted hover:text-primary-text active:scale-95 transition"
              aria-label="Toggle Theme"
              title={isDarkMode ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            <div className="hidden lg:block">
              {user.isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-sm lg:text-base font-bold text-text-base">
                      {appData.header.auth.greetingPrefix} {user.name}
                    </span>
                    <Badge className="text-[8px] mt-0.5 shadow-sm">{appData.header.auth.verifiedBadge}</Badge>
                  </div>
                  <button onClick={logout} className="cursor-pointer text-xs lg:text-sm text-danger-text hover:underline" title="Keluar dari sesi saat ini">{appData.header.auth.logoutButton}</button>
                </div>
              ) : (
                <button onClick={handleLogin} className="inline-flex items-center gap-2.5 cursor-pointer bg-white dark:bg-bg-surface border border-border-base hover:bg-bg-subtle text-text-heading text-sm px-4 py-2.5 rounded-xl font-bold transition shadow-sm" title="Masuk dengan akun SSO Kampus">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">{appData.header.auth.loginButton}</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden cursor-pointer p-2 rounded-xl text-text-base hover:text-primary-text focus:outline-none active:scale-95 transition"
              aria-label="Open Menu"
              title={isMobileMenuOpen ? "Tutup Menu" : "Buka Menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed right-0 top-16 w-64 bg-bg-glass backdrop-blur-xl border-l border-b border-border-subtle rounded-bl-3xl p-5 pt-4 z-40 lg:hidden shadow-2xl transition-all duration-300">
          <nav className="flex flex-col gap-4 text-base font-semibold text-text-base">
            {appData.header.navLinks.map((link) => (
              <a key={link.path} href={link.path} className={getMobileClass(link.path)}>
                {link.label}
              </a>
            ))}

            <div className="flex flex-col gap-3">
              {user.isLoggedIn ? (
                <button onClick={logout} className="cursor-pointer w-full text-center bg-danger-base hover:bg-danger-hover text-text-inverted font-semibold py-3 rounded-xl shadow-md transition" title="Keluar dari sesi saat ini">
                  {appData.header.auth.logoutButton}
                </button>
              ) : (
                <button onClick={handleLogin} className="flex items-center justify-center gap-2.5 cursor-pointer w-full bg-white dark:bg-bg-surface border border-border-base hover:bg-bg-subtle text-text-heading text-sm font-bold py-3.5 px-3 rounded-xl shadow-sm transition" title="Masuk dengan akun SSO Kampus">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 shrink-0" />
                  <span className="whitespace-nowrap">{appData.header.auth.loginButton}</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
