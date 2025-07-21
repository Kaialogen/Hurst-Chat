import {
  HiHome,
  HiOutlineHashtag,
  HiUserGroup,
  HiBookmark,
} from "react-icons/hi";

export default function NavigationBar() {
  return (
    <nav className="h-screen w-56 bg-zinc-900 text-white flex flex-col py-8 shadow-lg">
      <ul className="space-y-2">
        <li>
          <button className="flex items-center w-full px-6 py-3 rounded-lg hover:bg-zinc-800 transition">
            <HiHome className="text-2xl mr-4" />
            <span className="text-lg font-medium">Home</span>
          </button>
        </li>
        <li>
          <button className="flex items-center w-full px-6 py-3 rounded-lg hover:bg-zinc-800 transition">
            <HiOutlineHashtag className="text-2xl mr-4" />
            <span className="text-lg font-medium">Explore</span>
          </button>
        </li>
        <li>
          <button className="flex items-center w-full px-6 py-3 rounded-lg hover:bg-zinc-800 transition">
            <HiUserGroup className="text-2xl mr-4" />
            <span className="text-lg font-medium">People</span>
          </button>
        </li>
        <li>
          <button className="flex items-center w-full px-6 py-3 rounded-lg hover:bg-zinc-800 transition">
            <HiBookmark className="text-2xl mr-4" />
            <span className="text-lg font-medium">Saved</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
