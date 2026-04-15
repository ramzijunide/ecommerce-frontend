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

                <button onclick="addCart(${p.price})">Add to Cart</button>
            </div>
        </div>
    `;
});

let qty = 1;

function changeQty(v){
    qty += v;
    if(qty < 1) qty = 1;

    document.getElementById("qty").textContent = qty;

    const price = parseFloat(document.querySelector(".price").textContent.replace("$",""));
    document.getElementById("total").textContent = (price * qty).toFixed(2);
}

function addCart(price){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({price, qty});

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart");
}
