import { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    event.preventDefault(); // Stop the form from reloading the page
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Login successful! Redirecting...");
        window.location.href = "/"; // Redirect to Homepage
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div id="wrapper" className="flex flex-col items-center">
      <div
        id="content"
        className="bg-[#2215f7] rounded-[20px] font-sans px-[30px] py-[20px] text-left w-[900px] float-left shadow-lg"
      >
        <h2 className="text-center text-white text-2xl p-6">Sign in</h2>
        <form
          name="Login"
          onSubmit={login}
          className="flex flex-col gap-6 items-center w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow"
        >
          <div className="w-full">
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
