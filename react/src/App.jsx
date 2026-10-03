import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Patungan from "./pages/Patungan";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import History from "./pages/History";

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
  }

  const isPlainLayout = false;

  return (
    <div className="bg-bg-base text-text-base min-h-screen font-sans transition-colors duration-300 selection:bg-primary-base selection:text-text-inverted">
      {!isPlainLayout && <Header />}
      <PageComponent />
      {!isPlainLayout && <Footer />}
    </div>
  );
}

export default App;
