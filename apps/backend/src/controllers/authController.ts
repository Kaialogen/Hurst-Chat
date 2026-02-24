const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../db');
import { Request, Response } from 'express';

// Secret key for JWT
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// Login Route
exports.login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing username or password' });
  }

  try {
    const { rows } = await pool.query('SELECT user_name, user_pass FROM users WHERE user_name = $1', [username]);

    // Fetch credentials from database and Check credentials
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials - User does not exist' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.user_pass);
    if (!passwordMatch) return res.status(401).json({ message: 'Incorrect password' });

    // Generate JWT token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    // Set HttpOnly, Secure Cookie
    res.cookie('authToken', token, {
      httpOnly: true, // Prevent access from JavaScript
      secure: false, // Only send over HTTPS
      sameSite: 'strict', // Prevent CSRF
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json('Login successful!');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Signup route
exports.register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if username or email already exists
    const { rows: existingUsers } = await pool.query(
      'SELECT user_name, user_email FROM users WHERE user_name = $1 OR user_email = $2',
      [username, email],
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database
    await pool.query(
      'INSERT INTO users (user_name, user_pass, user_email, user_date, user_level) VALUES ($1, $2, $3, NOW(), 0)',
      [username, hashedPassword, email],
    );

    res.status(201).json({ message: 'Signup successful!' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.profile = (req: Request, res: Response) => {
  const token = req.cookies.authToken;

  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ username: decoded.username });
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

exports.logout = (req: Request, res: Response) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
  res.json({ message: 'Logged out' });
};
