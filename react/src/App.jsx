import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen font-sans transition-colors duration-300 selection:bg-blue-500 selection:text-white">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
