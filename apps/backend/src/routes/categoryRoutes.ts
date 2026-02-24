const express = require('express');
const { categories, newCategory, categoryByName, recentTopic } = require('../controllers/categoryController');

const router = express.Router();

router.get('/categories', categories);
router.post('/categories', newCategory);
router.get('/categories/:categoryName', categoryByName);
router.get('/categories/:categoryId/recent', recentTopic);

module.exports = router;
