const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const pool = require("./db");

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

// Login Route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }

  try {
    const { rows } = await pool.query(
      "SELECT user_name, user_pass FROM users WHERE user_name = $1",
      [username],
    );

    // Fetch credentials from database and Check credentials
    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Invalid credentials - User does not exist" });
    }

    const hashedInputPassword = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex");

    const user = rows[0];
    const storedPassword = user.user_pass;

    if (hashedInputPassword !== storedPassword) {
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
    // Check if username or email already exists
    const { existingUsers } = await pool.query(
      "SELECT user_name, user_email FROM users WHERE user_name = $1 OR user_email = $2",
      [username, email],
    );

    if (existingUsers) {
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
    await pool.query(
      "INSERT INTO users (user_name, user_pass, user_email, user_date, user_level) VALUES ($1, $2, $3, NOW(), 0)",
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

app.get("/api/categories", async (req, res) => {
  // Fetch categories from the database
  const { rows: categories } = await pool.query("SELECT * FROM categories");

  // If no categories found, return 404
  if (!categories || categories.length === 0) {
    return res.status(404).json({ message: "No categories found" });
  }
  res.json(categories);
});

// Add a new category
app.post("/api/categories", async (req, res) => {
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

  try {
    const result = await pool.query(
      "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
      [name, description],
    );
    res.status(201).json({
      message: "Category added successfully",
      category: result.rows[0],
    });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a specific topic by category name
app.get("/api/categories/:categoryName", async (req, res) => {
  // Get the category name from the request parameters
  const categoryName = req.params.categoryName;
  try {
    const { rows: categories } = await pool.query(
      `SELECT t.* FROM topics t
       INNER JOIN categories c ON t.category_id = c.id
       WHERE c.name = $1`,
      [categoryName],
    );

    if (categories.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/categories/:categoryId/recent
app.get("/api/categories/:categoryId/recent", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const recentPost = await pool.query(
      `SELECT * FROM topics WHERE category_id = $1 ORDER BY created_at DESC LIMIT 1`,
      [categoryId],
    );
    res.json(recentPost.rows[0] || null);
  } catch (error) {
    console.error("Error fetching recent post:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
