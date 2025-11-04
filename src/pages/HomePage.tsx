import HomeFeed from "../components/Homefeed/HomeFeed.tsx";
import NavigationBar from "../components/NavigationBar/NavigationBar";

export default function HomePage() {
  return (
      <div className="grid grid-cols-3 grid-rows-1">
        <NavigationBar />
        <HomeFeed />
      </div>
  );
}
