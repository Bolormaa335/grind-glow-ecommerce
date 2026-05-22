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

// Start server on port 3000
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});