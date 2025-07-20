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

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  post_content VARCHAR(255) NOT NULL,
  post_date TIMESTAMP NOT NULL,
  post_topic INTEGER NOT NULL,
  post_by INTEGER NOT NULL
);

INSERT INTO posts (post_id, post_content, post_date, post_topic, post_by) VALUES
(1, 'I love discussing the latest tech trends!', '2023-09-17 12:33:08', 1, 2),
(2, 'What are your tips for staying fit during winter?', '2023-09-18 14:50:30', 2, 3),
(3, 'Has anyone tried the new Zelda game?', '2023-09-19 10:45:22', 3, 4),
(4, 'I just started learning Python! Any resources?', '2023-09-20 16:25:11', 4, 5),
(5, 'Check out my travel blog for more!', '2023-09-21 18:33:44', 5, 6);

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
  topic_content VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  topic_author INTEGER NOT NULL
);

INSERT INTO topics (topic_id, category_id, topic_content, created_at, topic_author) VALUES
(1, 1, 'Latest in Tech News', '2023-09-15 10:20:10', 2),
(2, 2, 'Healthy Habits for a Balanced Life', '2023-09-16 11:25:50', 3),
(3, 3, 'Best Games of 2023', '2023-09-17 14:45:00', 4),
(4, 4, 'Learning Programming', '2023-09-18 15:30:00', 5),
(5, 5, 'Travel Destinations for 2024', '2023-09-19 16:00:00', 6);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(30) NOT NULL,
  user_pass VARCHAR(100) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_date TIMESTAMP NOT NULL,
  user_level INTEGER NOT NULL
);