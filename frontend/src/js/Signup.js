async function signup(event) {
  event.preventDefault();

  const formData = new FormData(document.forms["Signup"]);
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password2");

  try {
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      alert("Signup successful! Redirecting...");
      window.location.href = "/index.html";
    } else {
      alert(data.message || "Login failed.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Something went wrong. Please try again.");
  }
}
