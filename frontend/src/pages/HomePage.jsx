import Navbar from "../components/Navbar/Navbar";
import LogoBanner from "../components/LogoBanner/LogoBanner";
import Categories from "../components/Categories/Categories";

export default function HomePage() {
  return (
    <div className="bg-[#f5f5ff] text-center">
      <Navbar />
      <LogoBanner />
      <Categories />
    </div>
  );
}
