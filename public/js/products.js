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
}