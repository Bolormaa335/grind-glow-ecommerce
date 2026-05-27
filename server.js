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
// API route: add product to basket
app.post("/api/basket", (req, res) => {

    // Get product id from request body
    const productId = req.body.product_id;

    // SQL query to insert product into basket
    const sql = "INSERT INTO basket (product_id, quantity) VALUES (?, 1)";

    connection.query(sql, [productId], (err) => {

        if (err) {
            console.log(err);
            res.status(500).send("Basket insert error");
            return;
        }

        res.json({ message: "Product added to basket" });
    });
});


// API route: get basket items
app.get("/api/basket", (req, res) => {

    const sql = `
        SELECT
            basket.id,
            products.name,
            products.price,
            basket.quantity
        FROM basket
        JOIN products
        ON basket.product_id = products.id
    `;

    connection.query(sql, (err, results) => {

        if (err) {
            console.log(err);
            res.status(500).send("Basket fetch error");
            return;
        }

        res.json(results);
    });
});


// API route: remove item from basket
app.delete("/api/basket/:id", (req, res) => {

    const basketId = req.params.id;

    const sql = "DELETE FROM basket WHERE id = ?";

    connection.query(sql, [basketId], (err) => {

        if (err) {
            console.log(err);
            res.status(500).send("Basket delete error");
            return;
        }

        res.json({ message: "Item removed from basket" });
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