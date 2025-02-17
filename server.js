const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const mysql = require("mysql2/promise");

const dbConfig = {
  host: "db",
  user: "user",
  password: "userpassword",
  database: "mydatabase",
};

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// Secret key for JWT
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Login Route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Fetch credentials from database and Check credentials
    const [rows] = await connection.execute(
      "SELECT user_name, user_pass FROM users WHERE user_name = ?",
      [username],
    );

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Invalid credentials - User does not exist" });
    }

    const user = rows[0];

    const hashedInputPassword = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex");

    if (hashedInputPassword !== user.user_pass) {
      return res
        .status(401)
        .json({ message: "Invalid credentials - Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

    // Set HttpOnly, Secure Cookie
    res.cookie("authToken", token, {
      httpOnly: true, // Prevent access from JavaScript
      secure: false, // Only send over HTTPS
      sameSite: "Strict", // Prevent CSRF
      maxAge: 3600000, // 1 hour
    });

    res.json({ message: "Login successful!" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/profile", (req, res) => {
  const token = req.cookies.authToken;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ username: decoded.username });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("authToken", { httpOnly: true, secure: true, sameSite: "Strict" });
  res.json({ message: "Logged out" });
});


// Serve the main HTML file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
