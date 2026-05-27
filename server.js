// Import Express package
const express = require("express");

// Import path module to work with file paths
const path = require("path");

// Create Express application
const app = express();

// Allow server to receive JSON data
app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Home route: show index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// API route: get all products from MySQL database
app.get("/api/products", (req, res) => {

    // SQL query to read all products
    const sql = "SELECT * FROM products";

    // Run SQL query
    connection.query(sql, (err, results) => {

        // If database error happens
        if (err) {
            console.log(err);
            res.status(500).send("Database error");
            return;
        }

        // Send products as JSON
        res.json(results);
    });
});

// Start server on port 3000
// Start server on port 3000
app.listen(3000, () => {

    // Connect to MySQL database
    connection.connect((err) => {
        if (err) {
            console.log("Database connection failed");
            console.log(err);
            return;
        }

        console.log("Database connected successfully");
    });

    console.log("Server running at http://localhost:3000");
});
// Import database connection
const connection = require("./database");