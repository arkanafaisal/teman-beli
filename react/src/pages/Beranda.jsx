import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HeroSection from "../components/beranda/HeroSection";
import KategoriSection from "../components/beranda/KategoriSection";
import FiturSection from "../components/beranda/FiturSection";
import HistorySection from "../components/beranda/HistorySection";
import TestimoniSection from "../components/beranda/TestimoniSection";
import FaqSection from "../components/beranda/FaqSection";
import CtaSection from "../components/beranda/CtaSection";

export default function Beranda() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <main>
      <HeroSection />
      <KategoriSection />
      <FiturSection />
      <HistorySection />
      <TestimoniSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
