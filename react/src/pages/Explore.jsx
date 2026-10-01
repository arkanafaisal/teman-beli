import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { exploreData } from "../data/explore";
import ExploreHeader from "../components/explore/ExploreHeader";
import ExploreFilter from "../components/explore/ExploreFilter";
import ExploreFeed from "../components/explore/ExploreFeed";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    AOS.init({
      once: false,
      mirror: true,
      duration: 700,
      easing: "ease-in-out",
    });
  }, []);

  // Use useEffect to refresh AOS on feed change just like vanilla
  useEffect(() => {
    AOS.refresh();
  }, [searchQuery, activeCategory]);

  const filteredItems = exploreData.mockData.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.area.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <main className="min-h-screen pb-20">
      <ExploreHeader />
      <ExploreFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <ExploreFeed items={filteredItems} />
    </main>
  );
}
