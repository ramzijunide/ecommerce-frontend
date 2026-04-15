initCartCount();

const container = document.getElementById("productDetail");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(p => {

        container.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-image">
                <img src="${p.image}">
            </div>

            <div>
                <h2>${p.title}</h2>
                <p class="price">$${p.price}</p>
                <p>${p.description}</p>

                <div class="quantity">
                    <button onclick="changeQty(-1)">-</button>
                    <span id="qty">1</span>
                    <button onclick="changeQty(1)">+</button>
                </div>

                <p>Total: $<span id="total">${p.price}</span></p>

                <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
            </div>
        </div>
        `;
    });

let qty = 1;

function changeQty(v) {
    qty += v;
    if (qty < 1) qty = 1;

    document.getElementById("qty").textContent = qty;

    const price = parseFloat(document.querySelector(".price").textContent.replace("$", ""));
    document.getElementById("total").textContent = (price * qty).toFixed(2);
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: qty
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
