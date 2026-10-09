import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import FeatureSection from "../components/home/FeatureSection";
import HistorySection from "../components/home/HistorySection";
import TestimonialSection from "../components/home/TestimonialSection";
import FaqSection from "../components/home/FaqSection";
import CtaSection from "../components/home/CtaSection";

export default function Home() {
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
      <CategorySection />
      <FeatureSection />
      {/* <HistorySection /> */}
      <TestimonialSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
