import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Patungan from "./pages/Patungan";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import History from "./pages/History";
import { ProtectedAdminRoute, ProtectedUserRoute } from "./components/ProtectedRoute";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPatungan from "./pages/admin/Patungan";
import AdminKomunitas from "./pages/admin/Komunitas";
import AdminPengguna from "./pages/admin/Pengguna";
import AdminUlasan from "./pages/admin/Ulasan";

import { useAuth } from "./context/AuthContext";
import ActionModal from "./components/common/ActionModal";
import { useState } from "react";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const { user } = useAuth();
  const isPlainLayout = location.pathname.startsWith("/admin");
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);

  const [hasPromptedSession, setHasPromptedSession] = useState(false);

  useEffect(() => {
    if (user?.role === "ADMIN" && !isPlainLayout && !hasPromptedSession) {
      const lastShown = localStorage.getItem("adminPromptLastShown");
      const now = Date.now();
      const tenMinutes = 10 * 60 * 1000;

      if (!lastShown || now - parseInt(lastShown, 10) > tenMinutes) {
        setShowAdminPrompt(true);
      }
      // Set session variable so it doesn't trigger again just by internal routing
      setHasPromptedSession(true);
    }
  }, [user, isPlainLayout, hasPromptedSession]);

  const closePrompt = () => {
    localStorage.setItem("adminPromptLastShown", Date.now().toString());
    setShowAdminPrompt(false);
  };

  const navigate = useNavigate();

  const handleYes = () => {
    // Only close modal and navigate, do NOT set the 10-minute cooldown
    setShowAdminPrompt(false);
    navigate("/admin");
  };

  return (
    <>
      {!isPlainLayout && <Header />}
      {children}
      {!isPlainLayout && <Footer />}

      <ActionModal
        isOpen={showAdminPrompt}
        type="confirm"
        title="Mode Admin Terdeteksi"
        description="Anda masuk sebagai Admin. Apakah Anda ingin diarahkan ke Halaman Admin untuk mengelola sistem?"
        confirmText="Ke Halaman Admin"
        cancelText="Tetap di Sini"
        icon="info"
        onConfirm={handleYes}
        onCancel={closePrompt}
      />
    </>
  );
}

function App() {
  useEffect(() => {
    // Global dark mode initialization
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="bg-bg-base text-text-base min-h-screen font-sans transition-colors duration-300 selection:bg-primary-base selection:text-text-inverted">
      <Toaster
        position="top-right"
        closeButton
        toastOptions={{
          classNames: {
            toast: 'rounded-l-xl rounded-r-none font-bold shadow-xl border-0 !p-3 !pr-5',
            title: 'text-xs md:text-sm leading-tight text-wrap',
            success: '!bg-success-base !text-text-inverted',
            error: '!bg-danger-base !text-text-inverted',
            info: '!bg-primary-base !text-text-inverted',
            warning: '!bg-warning-base !text-text-inverted',
          }
        }}
      />
      <BrowserRouter>
        <LayoutWrapper>
          <Routes>
            {/* --- RUTE PUBLIK & USER BIASA --- */}
            <Route element={<ProtectedUserRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/patungan" element={<Patungan />} />
              <Route path="/eksplor" element={<Patungan />} />
              <Route path="/komunitas" element={<Community />} />
              <Route path="/profil" element={<Profile />} />
              <Route path="/riwayat" element={<History />} />
            </Route>

            {/* --- RUTE KHUSUS ADMIN --- */}
            <Route element={<ProtectedAdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/patungan" element={<AdminPatungan />} />
              <Route path="/admin/komunitas" element={<AdminKomunitas />} />
              <Route path="/admin/pengguna" element={<AdminPengguna />} />
              {/* <Route path="/admin/ulasan" element={<AdminUlasan />} /> */}
            </Route>

          </Routes>
        </LayoutWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;
