// Import Express package for creating the server
const express = require("express");

// Import path module to work with file and folder paths
const path = require("path");

// Import database connection from database.js
const connection = require("./database");

// Create Express application
const app = express();

// Allow server to receive JSON data from frontend requests
app.use(express.json());

// Serve static files such as HTML, CSS, JS and images from public folder
app.use(express.static(path.join(__dirname, "public")));


// Home route: show index.html when user visits localhost:3000
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


// API route: get all products from MySQL database
app.get("/api/products", (req, res) => {

    // SQL query to read all products from products table
    const sql = "SELECT * FROM products";

    // Run SQL query
    connection.query(sql, (err, results) => {

        // If database error happens, show error response
        if (err) {
            console.log(err);
            res.status(500).send("Database error");
            return;
        }

        // Send product data to frontend as JSON
        res.json(results);
    });
});


// API route: add selected product to basket
app.post("/api/basket", (req, res) => {

    // Get product id from frontend request body
    const productId = req.body.product_id;

    // SQL query to insert selected product into basket table
    const sql =
        "INSERT INTO basket (product_id, quantity) VALUES (?, 1)";

    // Run SQL query with product id value
    connection.query(sql, [productId], (err) => {

        // If insert fails, send error message
        if (err) {
            console.log(err);
            res.status(500).send("Basket insert error");
            return;
        }

        // Send success message back to frontend
        res.json({
            message: "Product added to basket"
        });
    });
});


// API route: get all basket items from database
app.get("/api/basket", (req, res) => {

    // SQL query joins basket table with products table
    // so basket can display product name and price
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

    // Run SQL query
    connection.query(sql, (err, results) => {

        // If database error happens, send error response
        if (err) {
            console.log(err);
            res.status(500).send("Basket fetch error");
            return;
        }

        // Send basket data to frontend as JSON
        res.json(results);
    });
});


// API route: remove one item from basket
app.delete("/api/basket/:id", (req, res) => {

    // Get basket item id from URL parameter
    const basketId = req.params.id;

    // SQL query to delete selected basket item
    const sql = "DELETE FROM basket WHERE id = ?";

    // Run SQL query with basket item id
    connection.query(sql, [basketId], (err) => {

        // If delete fails, send error message
        if (err) {
            console.log(err);
            res.status(500).send("Basket delete error");
            return;
        }

        // Send success message back to frontend
        res.json({
            message: "Item removed from basket"
        });
    });
});


// API route: clear all basket items after checkout
app.delete("/api/basket", (req, res) => {

    // SQL query to remove all basket rows
    const sql = "DELETE FROM basket WHERE id > 0";

    // Run SQL query
    connection.query(sql, (err) => {

        // If clear fails, send error message
        if (err) {
            console.log(err);
            res.status(500).send("Basket clear error");
            return;
        }

        // Send success message
        res.json({
            message: "Basket cleared successfully"
        });
    });
});


// API route: update product price from admin page
app.put("/api/products/:id/price", (req, res) => {

    // Get product id from URL
    const productId = req.params.id;

    // Get new price from frontend request body
    const newPrice = req.body.price;

    // SQL query to update selected product price
    const sql = "UPDATE products SET price = ? WHERE id = ?";

    // Run SQL query with new price and product id
    connection.query(sql, [newPrice, productId], (err) => {

        // If update fails, send error message
        if (err) {
            console.log(err);
            res.status(500).send("Price update error");
            return;
        }

        // Send success message back to admin page
        res.json({
            message: "Price updated successfully"
        });
    });
});


// Start server on port 3000
app.listen(3000, () => {

    // Connect to MySQL database when server starts
    connection.connect((err) => {

        // If connection fails, show error in terminal
        if (err) {
            console.log("Database connection failed");
            console.log(err);
            return;
        }

        // Success message if database connection works
        console.log("Database connected successfully");
    });

    // Server running message
    console.log("Server running at http://localhost:3000");
});