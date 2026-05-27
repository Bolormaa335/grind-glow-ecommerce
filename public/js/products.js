// Fetch products from MySQL database through server API
fetch("/api/products")
    .then(response => response.json())
    .then(products => {

        // Select products container
        const container = document.getElementById("productsContainer");

        // Loop through products from database
        products.forEach(product => {

            // Create product card
            const card = document.createElement("div");
            card.className = "card";

            // Add milk option only for coffee drinks
            let milkOption = "";

            if (
                product.name === "Latte" ||
                product.name === "Americano" ||
                product.name === "Cappuccino"
            ) {
                milkOption = `
                    <div class="milk-option">
                        <label>Milk Option:</label>
                        <select>
                            <option>Regular Milk</option>
                            <option>Oat Milk</option>
                            <option>Almond Milk</option>
                            <option>Soy Milk</option>
                        </select>
                    </div>
                `;
            }

            // Add product details into card
            card.innerHTML = `
                <img src="images/${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <p><strong>€${product.price}</strong></p>

                ${milkOption}

                <button onclick="addToBasket(${product.id})">Add to Basket
                 </button>
            `;

            // Display card on page
            container.appendChild(card);
        });
    });


// Function to add selected product to basket database
function addToBasket(productId) {

    // Send selected product id to server
    fetch("/api/basket", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            product_id: productId
        })
    })

    // Convert response to JSON
    .then(response => response.json())

    // Show success message
    .then(data => {
        alert(data.message);
    });
}