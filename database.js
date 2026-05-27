// Import MySQL2 package for database connection
const mysql = require("mysql2");

// Create MySQL database connection
const connection = mysql.createConnection({
    // Database host
    host: "localhost",
    // MySQL username
    user: "root",
    // MySQL password
    password: "admin123",

    // Database name used for the project
    database: "grindglow"
});

// Export connection object
// so it can be used inside server.js
module.exports = connection;