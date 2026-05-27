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

                <button onclick="addToBasket('${product.name}', '€${product.price}')">
                    Add to Basket
                </button>
            `;

            // Display card on page
            container.appendChild(card);
        });
    });


// Function to add selected product to basket
function addToBasket(name, price) {

    const product = {
        name: name,
        price: price
    };

    let basket = JSON.parse(localStorage.getItem("basket")) || [];

    basket.push(product);

    localStorage.setItem("basket", JSON.stringify(basket));

    alert(name + " added to basket!");
}