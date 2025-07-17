async function getProfile() {
  const response = await fetch("http://localhost:3000/api/profile", {
    method: "GET",
    credentials: "include", // Include cookies in request
  });

  const userbar = document.getElementById("userbar"); // Get the userbar div

  if (response.ok) {
    const data = await response.json();
    console.log("User:", data.username);

    // Update the userbar with the logged-in username & sign-out button
    userbar.innerHTML = `
            <a href="#">${data.username}</a>
            <a href="#" class="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition" onclick="logout()">Sign out</a>
        `;
  } else {
    console.log("Not authenticated");

    // Show login & register links for guests
    userbar.innerHTML = `
            <a class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition" href="signin.html">Login</a>
            <a class="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition" href="signup.html">Register</a>
        `;
  }
}

async function logout() {
  await fetch("http://localhost:3000/api/logout", {
    method: "POST",
    credentials: "include",
  });

  console.log("Logged out");
  getProfile(); // Refresh the navbar
}
