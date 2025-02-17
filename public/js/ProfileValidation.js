async function getProfile() {
    const response = await fetch("/api/profile", {
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
            <a href="#" onclick="logout()">Sign out</a>
        `;
    } else {
        console.log("Not authenticated");

        // Show login & register links for guests
        userbar.innerHTML = `
            <a href="signin.html">Login</a>
            <a href="signup.html">Register</a>
        `;
    }
}

async function logout() {
    await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
    });

    console.log("Logged out");
    getProfile(); // Refresh the navbar
}