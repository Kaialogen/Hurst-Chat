const pool = require('../db');
import { Request, Response } from 'express';

// GET: Get all categories
exports.categories = async (req: Request, res: Response) => {
  // Fetch categories from the database
  const { rows: categories } = await pool.query('SELECT * FROM categories');

  // If no categories found, return 404
  if (!categories || categories.length === 0) {
    return res.status(404).json({ message: 'No categories found' });
  }
  res.json(categories);
};

// POST: Add a new category
exports.newCategory = async (req: Request, res: Response) => {
  let name, description;
  if (Array.isArray(req.body) && req.body.length > 0) {
    name = req.body[0].name;
    description = req.body[0].description;
  } else {
    name = req.body.name;
    description = req.body.description;
  }

  if (!name || !description) {
    return res.status(400).json({ message: 'Name and description are required' });
  }

  try {
    const result = await pool.query('INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *', [
      name,
      description,
    ]);
    res.status(201).json({
      message: 'Category added successfully',
      category: result.rows[0],
    });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET: Get a specific topic by category name
exports.categoryByName = async (req: Request, res: Response) => {
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
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET: Get the most recent topic from a given category
exports.recentTopic = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  try {
    const recentPost = await pool.query(
      `SELECT * FROM topics WHERE category_id = $1 ORDER BY created_at DESC LIMIT 1`,
      [categoryId],
    );
    res.json(recentPost.rows[0] || null);
  } catch (error) {
    console.error('Error fetching recent post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
