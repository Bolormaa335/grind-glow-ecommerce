// Get basket items from localStorage
let basket = JSON.parse(localStorage.getItem("basket")) || [];

// Select basket container from HTML
let basketContainer = document.getElementById("basketContainer");

// Select total price element
let totalPrice = document.getElementById("totalPrice");

// Total price starts from zero
let total = 0;

// If basket is empty, show message
if (basket.length === 0) {
    basketContainer.innerHTML = "<p>Your basket is empty.</p>";
    totalPrice.textContent = "";
} else {

    // Loop through every item in basket
    basket.forEach((item, index) => {

        // Convert price text like €4.50 into number
        let priceNumber = Number(item.price.replace("€", ""));

        // Add price to total
        total += priceNumber;

        // Create basket item card
        let div = document.createElement("div");

        // Add class for styling
        div.className = "basket-item";

        // Add item details into card
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.price}</p>

            <!-- Remove button removes item by index -->
            <button onclick="removeItem(${index})">Remove</button>
        `;

        // Display item in basket page
        basketContainer.appendChild(div);
    });

    // Display total price
    totalPrice.textContent = "Total: €" + total.toFixed(2);
}


// Function to remove product from basket
function removeItem(index) {

    // Remove selected item from basket array
    basket.splice(index, 1);

    // Save updated basket to localStorage
    localStorage.setItem("basket", JSON.stringify(basket));

    // Reload page to update basket display
    location.reload();
}