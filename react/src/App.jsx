import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Patungan from "./pages/Patungan";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import History from "./pages/History";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPatungan from "./pages/admin/Patungan";
import AdminKomunitas from "./pages/admin/Komunitas";
import AdminPengguna from "./pages/admin/Pengguna";
import AdminUlasan from "./pages/admin/Ulasan";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  useEffect(() => {
    // Global dark mode initialization
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  let PageComponent = Home;
  if (currentPath === "/patungan" || currentPath === "/eksplor" || currentPath === "/eksplor.html") {
    PageComponent = Patungan;
  } else if (currentPath === "/komunitas" || currentPath === "/infokomun.html") {
    PageComponent = Community;
  } else if (currentPath === "/profil" || currentPath === "/profil.html") {
    PageComponent = Profile;
  } else if (currentPath === "/riwayat" || currentPath === "/riwayat.html") {
    PageComponent = History;
  } else if (currentPath.startsWith("/admin")) {
    if (currentPath === "/admin" || currentPath === "/admin/" || currentPath === "/admin/index.html") {
      PageComponent = AdminDashboard;
    } else if (currentPath === "/admin/patungan" || currentPath === "/admin/patungan.html") {
      PageComponent = AdminPatungan;
    } else if (currentPath === "/admin/komunitas" || currentPath === "/admin/komunitas.html") {
      PageComponent = AdminKomunitas;
    } else if (currentPath === "/admin/pengguna" || currentPath === "/admin/pengguna.html") {
      PageComponent = AdminPengguna;
    } else if (currentPath === "/admin/ulasan" || currentPath === "/admin/ulasan.html") {
      PageComponent = AdminUlasan;
    }
  }

  const isPlainLayout = currentPath.startsWith("/admin");

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
      {!isPlainLayout && <Header />}
      <PageComponent />
      {!isPlainLayout && <Footer />}
    </div>
  );
}

export default App;
