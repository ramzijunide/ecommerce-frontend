console.log("E-Commerce Website Loaded");

const productGrid = document.getElementById("productGrid");

// Run only if product section exists
if (productGrid) {
    fetchProducts();
}

// MAIN FUNCTION
async function fetchProducts() {
    try {
        // 1️⃣ Loading State
        productGrid.innerHTML = "<p>Loading products...</p>";

        // 2️⃣ Fetch API Data
        const response = await fetch("https://fakestoreapi.com/products");

        // Check if response is OK
        if (!response.ok) {
            throw new Error("API request failed");
        }

        const products = await response.json();

        // 3️⃣ Display Products
        displayProducts(products);

    } catch (error) {
        // 5️⃣ Error Handling
        console.error("Error fetching products:", error);
        productGrid.innerHTML = "<p>Failed to load products. Please try again.</p>";
    }
}

// FUNCTION TO DISPLAY PRODUCTS
function displayProducts(products) {
    productGrid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <h3>${product.title.substring(0, 50)}...</h3>
            <p class="price">$${product.price}</p>
            <p class="desc">${product.description.substring(0, 80)}...</p>
            <button onclick="addToCart()">Add to Cart</button>
        `;

        productGrid.appendChild(card);
    });
}

// CART FUNCTION
let cartCount = 5;

function addToCart() {
    cartCount++;
    document.querySelector(".cart-count").textContent = cartCount;
}
