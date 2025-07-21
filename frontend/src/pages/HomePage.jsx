import Navbar from "../components/Navbar/Navbar";
import Homefeed from "../components/HomeFeed/Homefeed";
import NavigationBar from "../components/NavigationBar/NavigationBar";

export default function HomePage() {
  return (
    <div className="w-full">
      <Navbar />
      <div className="grid grid-cols-3 grid-rows-1">
        <NavigationBar />
        <Homefeed />
      </div>
    </div>
  );
}
