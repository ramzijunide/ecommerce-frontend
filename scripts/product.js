const productContainer = document.getElementById("productDetail");

// Get ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Fetch single product
fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {
        displayProduct(product);
    })
    .catch(() => {
        productContainer.innerHTML = "<p>Failed to load product</p>";
    });

function displayProduct(product) {
    productContainer.innerHTML = `
        <div class="product-image">
            <img id="mainImage" src="${product.image}" alt="${product.title}">
        </div>

        <div class="product-info">
            <h2>${product.title}</h2>
            <p class="price">$${product.price}</p>
            <p>${product.description}</p>

            <div class="quantity">
                <button onclick="changeQty(-1)">-</button>
                <span id="qty">1</span>
                <button onclick="changeQty(1)">+</button>
            </div>

            <p>Total: $<span id="totalPrice">${product.price}</span></p>

            <button onclick="addToCart(${product.price})">
                Add to Cart
            </button>
        </div>
    `;
}

// Quantity logic
let quantity = 1;

function changeQty(value) {
    quantity += value;
    if (quantity < 1) quantity = 1;

    document.getElementById("qty").textContent = quantity;

    const price = parseFloat(document.querySelector(".price").textContent.replace("$", ""));
    document.getElementById("totalPrice").textContent = (price * quantity).toFixed(2);
}

// Add to cart (localStorage)
function addToCart(price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        price: price,
        quantity: quantity
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");
}
document.addEventListener("mouseover", function(e) {
    if (e.target.id === "mainImage") {
        e.target.style.transform = "scale(1.2)";
        e.target.style.transition = "0.3s";
    }
});

document.addEventListener("mouseout", function(e) {
    if (e.target.id === "mainImage") {
        e.target.style.transform = "scale(1)";
    }
});
