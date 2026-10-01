import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Community from "./pages/Community";

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
  if (currentPath === "/eksplor" || currentPath === "/eksplor.html") {
    PageComponent = Explore;
  } else if (currentPath.startsWith("/detail")) {
    PageComponent = Detail;
  } else if (currentPath.startsWith("/create") || currentPath === "/create.html") {
    PageComponent = Create;
  } else if (currentPath === "/komunitas" || currentPath === "/infokomun.html") {
    PageComponent = Community;
  }

  const isPlainLayout = currentPath.startsWith("/detail") || currentPath.startsWith("/create");

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen font-sans transition-colors duration-300 selection:bg-blue-500 selection:text-white flex flex-col justify-between">
      {!isPlainLayout && <Header />}
      <PageComponent />
      {!isPlainLayout && <Footer />}
    </div>
  );
}

export default App;
