
const cart = [];

const buttons = document.querySelectorAll(".cart-btn");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        let item = cart.find(function(product) {
            return product.name === name;
        });

        if (!item) {
            item = {
                name: name,
                price: price,
                quantity: 0,
                button: button
            };

            cart.push(item);
        }

        item.quantity++;
        updateButton(item);
        updateCart();
    });
});

function updateButton(item) {
    const button = item.button;
    button.innerHTML = "";

    if (item.quantity === 0) {
        button.textContent = "Add to Cart";
        button.onclick = function() {
            item.quantity++;
            updateButton(item);
            updateCart();
        };
        return;
    }

    const decrease = document.createElement("span");
    decrease.textContent = "−";
    decrease.style.cursor = "pointer";
    decrease.style.padding = "0 12px";

    const quantity = document.createElement("span");
    quantity.textContent = item.quantity;

    const increase = document.createElement("span");
    increase.textContent = "+";
    increase.style.cursor = "pointer";
    increase.style.padding = "0 12px";

    decrease.addEventListener("click", function(event) {
        event.stopPropagation();
        item.quantity--;

        if (item.quantity === 0) {
            cart.splice(cart.indexOf(item), 1);
            updateButton(item);
        } else {
            updateButton(item);
        }

        updateCart();
    });

    increase.addEventListener("click", function(event) {
        event.stopPropagation();
        item.quantity++;
        updateButton(item);
        updateCart();
    });

    button.appendChild(decrease);
    button.appendChild(quantity);
    button.appendChild(increase);
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty.";
    }

    cart.forEach(function(item) {
        const row = document.createElement("div");
        row.className = "cart-item";

        const details = document.createElement("span");
        details.textContent =
            item.name + " × " + item.quantity;

        const price = document.createElement("span");
        price.textContent =
            "₹" + item.price * item.quantity;

        row.appendChild(details);
        row.appendChild(price);
        cartItems.appendChild(row);

        total += item.price * item.quantity;
    });

    cartTotal.textContent = "₹" + total;
}
