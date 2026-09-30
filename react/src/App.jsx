import Header from "./components/Header";
import Footer from "./components/Footer";
import Beranda from "./pages/Beranda";

function App() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen font-sans transition-colors duration-300 selection:bg-blue-500 selection:text-white">
      <Header />
      <Beranda />
      <Footer />
    </div>
  );
}

export default App;
