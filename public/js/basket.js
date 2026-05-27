// Function to load basket items from database
function loadBasket() {
    // Fetch basket data from server
    fetch("/api/basket")
        .then(response => response.json())
        .then(items => {
            const basketContainer =
                document.getElementById("basketContainer");
            const totalPrice =
                document.getElementById("totalPrice");
            // Clear old content
            basketContainer.innerHTML = "";
            let total = 0;
            // If basket is empty
            if (items.length === 0) {
                basketContainer.innerHTML =
                    "<p>Your basket is empty. Please add products first.</p>";

                totalPrice.textContent = "";
                document.querySelector(".center").style.display = "none";
                return;
            }

            // Loop through basket items
            items.forEach(item => {
                const priceNumber = Number(item.price);
                total += priceNumber * item.quantity;

                const div = document.createElement("div");
                div.className = "basket-item";
                div.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>Price: €${priceNumber.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Subtotal: €${(priceNumber * item.quantity).toFixed(2)}</p>

                    <button onclick="removeItem(${item.id})">
                        Remove
                    </button>
                `;
                basketContainer.appendChild(div);
            });

            totalPrice.textContent =
                "Total: €" + total.toFixed(2);
        });
}

// Function to remove item from basket database
function removeItem(id) {

    fetch("/api/basket/" + id, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(() => {
        loadBasket();
    });
}
// Load basket when page opens
loadBasket();