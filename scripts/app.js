console.log("E-Commerce Website Loaded");

// Select product grid
const productGrid = document.getElementById("productGrid");

// Only run if product section exists
if (productGrid) {

    // Show loading text
    productGrid.innerHTML = "<p>Loading products...</p>";

    // Fetch products from API
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            displayProducts(data);
        })
        .catch(error => {
            console.error(error);
            productGrid.innerHTML = "<p>Failed to load products</p>";
        });
}

// Function to display products
function displayProducts(products) {
    productGrid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <h3>${product.title.substring(0, 40)}...</h3>
            <div class="price">$${product.price}</div>
            <button onclick="addToCart()">Add to Cart</button>
        `;

        productGrid.appendChild(card);
    });
}

// Cart counter (you already have badge = 5)
let cartCount = 5;

// Add to cart function
function addToCart() {
    cartCount++;
    document.querySelector(".cart-count").textContent = cartCount;
}
