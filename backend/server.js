const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const mysql = require("mysql2/promise");
const graphqlHandler = require("./graphql");
const categories = require("../db/categories");
const topics = require("../db/topics");
const pool = require("./db");

const dbConfig = {
  host: "localhost",
  user: "user",
  password: "userpassword",
  database: "mydatabase",
  port: 3306, // Default MySQL port
};

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Secret key for JWT
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// Posts API
app.all("/graphql", graphqlHandler);

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

    res.status(200).json("Login successful!");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Signup route
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Check if username or email already exists
    const [existingUsers] = await connection.execute(
      "SELECT user_name, user_email FROM users WHERE user_name = ? OR user_email = ?",
      [username, email],
    );

    if (existingUsers.length > 0) {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }

    // Hash password using SHA-1 (temporary, will be replaced with bcrypt later)
    const hashedPassword = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex");

    // Insert new user into database
    await connection.execute(
      "INSERT INTO users (user_name, user_pass, user_email, user_date, user_level) VALUES (?, ?, ?, NOW(), 0)",
      [username, hashedPassword, email],
    );

    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    console.error("Signup error:", error);
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
    console.error("Token verification error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.json({ message: "Logged out" });
});

app.get("/api/categories", (req, res) => {
  if (!categories || categories.length === 0) {
    return res.status(404).json({ message: "No categories found" });
  }
  res.json(categories);
});

// Add a new category
app.post("/api/categories", async (req, res) => {
  // Data looks like this:
  // [ { "name": "New Category", "description": "Category description" } ]
  let name, description;
  if (Array.isArray(req.body) && req.body.length > 0) {
    name = req.body[0].name;
    description = req.body[0].description;
  } else {
    name = req.body.name;
    description = req.body.description;
  }

  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Name and description are required" });
  }
  categories.push({
    id: categories.length + 1,
    name,
    description,
    topics: [],
  });
  res.status(201).json({ message: "Category added successfully", categories });
});

// Get a specific topic by category ID
app.get("/api/categories/:id", (req, res) => {
  const categoryId = parseInt(req.params.id, 10);
  const category = categories.find((cat) => cat.id === categoryId);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  // Add topics to the category
  category.topics = topics.filter((topic) => topic.category_id === categoryId);
  res.json(category);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
