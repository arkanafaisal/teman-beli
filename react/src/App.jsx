import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  let PageComponent = Home;
  if (currentPath === "/eksplor" || currentPath === "/eksplor.html") {
    PageComponent = Explore;
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen font-sans transition-colors duration-300 selection:bg-blue-500 selection:text-white">
      <Header />
      <PageComponent />
      <Footer />
    </div>
  );
}

export default App;
