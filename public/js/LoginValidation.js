async function login(event) {
    event.preventDefault(); // Stop the form from reloading the page

    const formData = new FormData(document.forms["Login"]);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            alert("Login successful! Redirecting...");
            window.location.href = "/index.html"; // Redirect to index.html
        } else {
            alert(data.message || "Login failed.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("Something went wrong. Please try again.");
    }
}
