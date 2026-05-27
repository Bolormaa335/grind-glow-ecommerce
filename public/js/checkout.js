// Select checkout form
const form = document.getElementById("checkoutForm");

// Run this function when user submits the form
form.addEventListener("submit", function(event) {

    // Stop normal form submission
    event.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;

    // Pattern allows letters and spaces only
    const namePattern = /^[A-Za-z\s]+$/;
    // Email pattern validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check name is not empty
    if (name === "") {
        alert("Please enter your full name.");
        return;
    }

    // Check name contains only letters
    if (!namePattern.test(name)) {
        alert("Name must contain letters only.");
        return;
    }

    // Check email is not empty
    if (email === "") {
        alert("Please enter your email.");
        return;
    }
    // Check email format
if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
}

    // Check address is not empty
    if (address === "") {
        alert("Please enter your delivery address.");
        return;
    }

    // Show success message
    alert("Thank you for your order, " + name + "!");

    // Clear basket after successful checkout
    localStorage.removeItem("basket");

    // Reset the form
    form.reset();
});