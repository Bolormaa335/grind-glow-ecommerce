// Import mysql2 package
const mysql = require("mysql2");

// Create MySQL database connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin123",
    database: "grindglow"
});

// Export connection so server.js can use it
module.exports = connection;