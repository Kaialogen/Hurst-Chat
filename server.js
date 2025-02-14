const express = require('express');
const path = require('path');
const connection = require('./database');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get all users
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(results);
    });
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});