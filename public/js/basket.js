// Get basket items from localStorage
let basket = JSON.parse(localStorage.getItem("basket")) || [];

// Select basket container
let basketContainer = document.getElementById("basketContainer");

// Select total price element
let totalPrice = document.getElementById("totalPrice");

// Create an empty object to group same products
let groupedBasket = {};

// Loop through basket and count same products
basket.forEach(function(item) {

    // If product already exists, increase quantity
    if (groupedBasket[item.name]) {
        groupedBasket[item.name].quantity += 1;
    } else {

        // If product does not exist, add it first time
        groupedBasket[item.name] = {
            name: item.name,
            price: item.price,
            quantity: 1
        };
    }
});

// Convert grouped object into array
let basketItems = Object.values(groupedBasket);

// Total price starts from zero
let total = 0;

// If basket is empty
if (basketItems.length === 0) {

    // Show message
    basketContainer.innerHTML =
        "<p>Your basket is empty. Please add products first.</p>";

    // Hide total
    totalPrice.textContent = "";

    // Hide checkout button
    document.querySelector(".center").style.display = "none";

} else {

    // Loop through grouped basket items
    basketItems.forEach(function(item) {

        // Convert price text to number
        let priceNumber =
            Number(item.price.replace("€", ""));

        // Add item subtotal to total
        total += priceNumber * item.quantity;

        // Create basket card
        let div = document.createElement("div");

        // Add CSS class
        div.className = "basket-item";

        // Add item details
        div.innerHTML = `
            <h3>${item.name}</h3>

            <p>Price: ${item.price}</p>

            <p>Quantity: ${item.quantity}</p>

            <p>Subtotal: €${(priceNumber * item.quantity).toFixed(2)}</p>

            <button onclick="removeOne('${item.name}')">
                Remove One
            </button>
        `;

        // Display item
        basketContainer.appendChild(div);
    });

    // Display total
    totalPrice.textContent =
        "Total: €" + total.toFixed(2);
}


// Function to remove one selected product
function removeOne(productName) {

    // Find first matching product index
    let index = basket.findIndex(function(item) {
        return item.name === productName;
    });

    // If product exists, remove one
    if (index !== -1) {
        basket.splice(index, 1);
    }

    // Save updated basket
    localStorage.setItem(
        "basket",
        JSON.stringify(basket)
    );

    // Reload page
    location.reload();
}