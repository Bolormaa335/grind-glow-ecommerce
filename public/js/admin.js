// Select admin form
const adminForm = document.getElementById("adminForm");

// Run function when form is submitted
adminForm.addEventListener("submit", function(event) {

    // Stop page refresh
    event.preventDefault();

    // Get values from form
    const name =
        document.getElementById("productName").value;

    const description =
        document.getElementById("productDescription").value;

    const price =
        document.getElementById("productPrice").value;

    const image =
        document.getElementById("productImage").value;

    // Create new product object
    const newProduct = {
        name: name,
        description: description,
        price: price,
        image: image
    };

    // Get old products
    let products =
        JSON.parse(localStorage.getItem("products")) || [];

    // Add new product
    products.push(newProduct);

    // Save updated products
    localStorage.setItem("products",
        JSON.stringify(products));

    // Success message
    alert("Product added successfully!");

    // Reset form
    adminForm.reset();
});