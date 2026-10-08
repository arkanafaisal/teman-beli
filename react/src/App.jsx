import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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

function LayoutWrapper({ children }) {
  const location = useLocation();
  const isPlainLayout = location.pathname.startsWith("/admin");

  return (
    <>
      {!isPlainLayout && <Header />}
      {children}
      {!isPlainLayout && <Footer />}
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
              <Route path="/admin/ulasan" element={<AdminUlasan />} />
            </Route>
            
          </Routes>
        </LayoutWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;
