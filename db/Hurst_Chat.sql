-- PostgreSQL dump for social media data

-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Drop and create tables

DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL
);

INSERT INTO categories (id, name, description) VALUES
(1, 'Technology', 'Discussions on the latest in technology and gadgets'),
(2, 'Health & Wellness', 'Share tips on fitness, mental health, and general wellness'),
(3, 'Gaming', 'Talk about your favorite video games and latest updates'),
(4, 'Education', 'Resources and discussions on learning and education'),
(5, 'Lifestyle', 'Share insights on fashion, travel, food, and more');

SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));

DROP TABLE IF EXISTS replies;
CREATE TABLE replies (
  reply_id SERIAL PRIMARY KEY,
  reply_content TEXT NOT NULL,
  reply_date TIMESTAMP NOT NULL,
  reply_topic INTEGER NOT NULL,
  reply_by INTEGER NOT NULL
);

DROP TABLE IF EXISTS topics;
CREATE TABLE topics (
  topic_id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL,
  topic_title VARCHAR(255) NOT NULL,
  topic_body TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  topic_author INTEGER NOT NULL
);

INSERT INTO topics (topic_id, category_id, topic_title, topic_body, created_at, topic_author) VALUES
(1, 1, 'Latest in Tech News', 'Discuss the most recent advancements in AI, blockchain, and consumer electronics. Share your thoughts on the latest product launches and tech trends.', '2023-09-15 10:20:10', 2),
(2, 2, 'Healthy Habits for a Balanced Life', 'Share your daily routines, nutrition tips, and exercise plans that help you maintain a healthy lifestyle. What habits have made the biggest difference for you?', '2023-09-16 11:25:50', 3),
(3, 3, 'Best Games of 2023', 'Let''s talk about the top video games released this year. Which titles stood out and why? Share your reviews and recommendations.', '2023-09-17 14:45:00', 4),
(4, 4, 'Learning Programming', 'Discuss the best resources, courses, and strategies for learning programming. Share your experiences as a beginner or tips for those just starting out.', '2023-09-18 15:30:00', 5),
(5, 5, 'Travel Destinations for 2024', 'What are your dream travel destinations for the upcoming year? Share itineraries, travel hacks, and must-see places around the world.', '2023-09-19 16:00:00', 6),
(6, 1, 'Understanding Quantum Computing', 'Explore the basics of quantum computing, its potential applications, and how it differs from classical computing. Ask questions or share resources.', '2023-09-20 17:15:00', 2),
(7, 2, 'Mental Health Awareness', 'Discuss strategies for maintaining mental health, breaking the stigma, and supporting others. Share helpful resources and personal stories.', '2023-09-21 18:45:00', 3),
(8, 3, 'Upcoming Game Releases', 'Stay updated on the most anticipated game releases. Share trailers, release dates, and what you''re most excited to play.', '2023-09-22 19:30:00', 4),
(9, 4, 'Online Learning Platforms', 'Review and compare popular online learning platforms. Which ones offer the best courses, and what has your experience been like?', '2023-09-23 20:00:00', 5),
(10, 5, 'Culinary Adventures Around the World', 'Share your favorite international dishes, recipes, and food experiences. Discuss unique culinary traditions and cooking tips.', '2023-09-24 21:15:00', 6);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(30) NOT NULL,
  user_pass VARCHAR(100) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_date TIMESTAMP NOT NULL,
  user_level INTEGER NOT NULL
);