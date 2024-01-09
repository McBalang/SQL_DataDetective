const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;

const dbPath = path.join(__dirname, 'detective.db');

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Database opening error:', err.message);
  } else {
    console.log('Connected to the database.');
  }
});

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle SQL query requests
app.get('/query', (req, res) => {
  const sqlQuery = req.query.sql;

  // Execute the SQL query
  db.all(sqlQuery, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    // Send the query result as JSON response
    res.json(rows);
  });
});

// Set up proxy middleware
const apiProxy = createProxyMiddleware('/SQL_DataDetective', {
  target: 'http://localhost:3000', 
  changeOrigin: true,
});

// Use the proxy middleware
app.use(apiProxy);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://192.168.x.x:3000/`);
});
