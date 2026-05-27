// Select admin form
const adminForm = document.getElementById("adminForm");

// Run when admin submits the form
adminForm.addEventListener("submit", function(event) {
    // Stop page reload
    event.preventDefault();

    // Get product id
    const productId =
        document.getElementById("productId").value;

    // Get new price
    const newPrice =
        document.getElementById("newPrice").value;

    // Validate product id
    if (productId === "") {
        alert("Please enter product ID.");
        return;
    }

    // Validate price
    if (newPrice === "" || Number(newPrice) <= 0) {
        alert("Please enter a valid price.");
        return;
    }
    // Send PUT request to update price in database
    fetch("/api/products/" + productId + "/price", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            price: newPrice
        })
    })
    .then(response => response.json())
    .then(data => {

        // Show success message
        alert(data.message);

        // Clear form
        adminForm.reset();
    });
});