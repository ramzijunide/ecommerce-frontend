const productGrid = document.getElementById("productGrid");

initCartCount();

if (productGrid) {
    productGrid.innerHTML = "Loading...";

    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            productGrid.innerHTML = "";

            data.forEach(p => {
                const card = document.createElement("div");
                card.classList.add("product-card");

                card.innerHTML = `
                    <a href="product.html?id=${p.id}">
                        <img src="${p.image}">
                    </a>
                    <h3>${p.title.substring(0, 40)}...</h3>
                    <p class="price">$${p.price}</p>
                    <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
                `;

                productGrid.appendChild(card);
            });
        });
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");
    updateCartCount();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.querySelectorAll(".cart-count").forEach(el => {
        el.textContent = total;
    });
}

function initCartCount() {
    updateCartCount();
}
