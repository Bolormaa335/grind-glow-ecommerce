// Function to add selected product to basket
function addToBasket(name, price) {

    // Create product object
    const product = {
        name: name,
        price: price
    };

    // Get old basket or create empty basket
    let basket = JSON.parse(localStorage.getItem("basket")) || [];

    // Add selected product into basket
    basket.push(product);

    // Save basket into browser localStorage
    localStorage.setItem("basket", JSON.stringify(basket));

    // Show success message
    alert(name + " added to basket!");
}// Select search input
const searchInput = document.getElementById("searchInput");

// Run search when user types
searchInput.addEventListener("keyup", function() {

    // Get typed text and make it lowercase
    const searchText = searchInput.value.toLowerCase();

    // Select all product cards
    const cards = document.querySelectorAll(".card");

    // Loop through each product card
    cards.forEach(function(card) {

        // Get product name
        const title = card.querySelector("h3").textContent.toLowerCase();

        // Show product if it matches search text
        if (title.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});