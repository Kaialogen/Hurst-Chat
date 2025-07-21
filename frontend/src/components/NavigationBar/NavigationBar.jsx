export default function NavigationBar() {
  return (
    <div
      id="content"
      className="bg-zinc-300 font-sans text-left flex justify-center"
    >
      <h2 className="text-center text-black text-2xl p-6">Navigation Bar</h2>
      <ul className="pl-6">
        <li>
          <button className="text-blue-600 hover:underline">Home</button>
        </li>
        <li>
          <button className="text-blue-600 hover:underline">Explore</button>
        </li>
        <li>
          <button className="text-blue-600 hover:underline">People</button>
        </li>
        <li>
          <button className="text-blue-600 hover:underline">Saved</button>
        </li>
      </ul>
    </div>
  );
}
