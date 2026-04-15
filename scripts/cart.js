const cartItemsDiv = document.getElementById("cartItems");
const totalEl = document.getElementById("cartTotal");

loadCart();

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty</p>";
        totalEl.textContent = "0";
        return;
    }

    cartItemsDiv.innerHTML = "";

    cart.forEach((item, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <img src="${item.image}" width="50">
            <p>${item.title}</p>
            <p>$${item.price}</p>

            <button onclick="changeQty(${index}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQty(${index}, 1)">+</button>

            <button onclick="removeItem(${index})">Remove</button>
        `;

        cartItemsDiv.appendChild(div);
    });

    updateTotal();
}

function changeQty(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart"));

    cart[index].quantity += change;

    if (cart[index].quantity < 1) cart[index].quantity = 1;

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

function updateTotal() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    totalEl.textContent = total.toFixed(2);
}

document.getElementById("checkoutBtn").onclick = () => {
    alert("Proceeding to checkout...");
};
