import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      const response = await fetch("http://localhost:3000/api/profile", {
        method: "GET",
        credentials: "include", // Include cookies in request
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User:", data.username);
        setUsername(data.username);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
    });
    console.log("Logged out");
    setLoggedIn(false);
    setUsername("");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">
      <div className="flex space-x-6 items-center">
        <Link
          to="/"
          className="font-bold text-lg hover:text-blue-400 transition"
        >
          Hurst Chat
        </Link>
      </div>
      <div className="flex space-x-4 items-center" id="userbar">
        {loggedIn ? (
          <>
            <Link
              to="/createCategory"
              className="hover:text-blue-400 transition"
            >
              Create
            </Link>
            <a href="#">{username}</a>
            <button
              href="#"
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/createCategory"
              className="hover:text-blue-400 transition"
            >
              Create
            </Link>
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
