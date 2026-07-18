import { menuItems } from "./data.js";
import { showToast } from "./toast.js";

const CART_KEY = "genz_cart";

export function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(id) {

    const cart = getCart();

    const product = menuItems.find(item => item.id === id);

    if (!product) return;

    const exist = cart.find(item => item.id === id);

    if (exist) {

        exist.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart(cart);

    updateCartCount();

    showToast(`${product.name} added to cart`, { icon: "fa-solid fa-cart-plus" });

}

export function updateCartCount() {

    const badge = document.getElementById("cart-count");

    const cart = getCart();

    let total = 0;

    cart.forEach(item => {

        total += item.quantity;

    });

    if (badge) {

        badge.textContent = total;

    }

    renderCartDropdown();

}

export function renderCartDropdown() {

    const container = document.getElementById("cart-dropdown-items");
    const totalLabel = document.getElementById("cart-dropdown-total");

    if (!container) return;

    const cart = getCart();

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="px-4 py-6 text-center text-gray-500">
                Your cart is empty.
            </div>
        `;

        if (totalLabel) totalLabel.textContent = "$0.00";

        return;

    }

    let total = 0;

    container.innerHTML = cart.map(item => {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        return `
        <div class="flex items-center gap-3 px-4 py-3">

            <img
                src="${item.image}"
                class="w-12 h-12 rounded-lg object-cover flex-shrink-0">

            <div class="flex-1 min-w-0">
                <p class="font-semibold truncate">${item.name}</p>
                <p class="text-gray-500">$${item.price.toFixed(2)}</p>
            </div>

            <div class="flex items-center gap-2">
                <button
                    class="border w-6 h-6 rounded cursor-pointer"
                    onclick="decrease(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button
                    class="border w-6 h-6 rounded cursor-pointer"
                    onclick="increase(${item.id})">+</button>
            </div>

            <button
                onclick="removeCart(${item.id})"
                class="text-red-500 hover:text-red-700 cursor-pointer ml-1"
                title="Remove">
                <i class="fa-solid fa-trash"></i>
            </button>

        </div>
        `;

    }).join("");

    if (totalLabel) totalLabel.textContent = "$" + total.toFixed(2);

}

export function removeCart(id) {

    let cart = getCart();

    cart = cart.filter(item => item.id !== id);

    saveCart(cart);

    updateCartCount();

    renderCart();

}

export function increase(id) {

    const cart = getCart();

    const product = cart.find(item => item.id === id);

    if (product) {

        product.quantity++;

    }

    saveCart(cart);

    updateCartCount();

    renderCart();

}

export function decrease(id) {

    let cart = getCart();

    const product = cart.find(item => item.id === id);

    if (!product) return;

    if (product.quantity > 1) {

        product.quantity--;

    } else {

        cart = cart.filter(item => item.id !== id);

    }

    saveCart(cart);

    updateCartCount();

    renderCart();

}

export function renderCart() {

    const container = document.getElementById("cart-container");

    if (!container) return;

    const cart = getCart();

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="text-center py-20">

                <h2 class="text-2xl font-bold">

                    Your cart is empty.

                </h2>

            </div>
        `;

        updateCartCount();

        return;

    }

    let total = 0;

    container.innerHTML = cart.map(item => {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        return `

        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b py-6 gap-4">

            <div class="flex gap-5 w-full sm:w-auto">

                <img
                    src="${item.image}"
                    class="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover flex-shrink-0">

                <div>

                    <h2 class="font-bold text-lg">

                        ${item.name}

                    </h2>

                    <p class="text-gray-500">

                        $${item.price.toFixed(2)}

                    </p>

                </div>

            </div>

            <div class="flex flex-row sm:flex-col md:flex-row items-center justify-between sm:justify-center gap-3 w-full sm:w-auto">

                <div class="flex items-center gap-3">

                    <button
                        class="border px-3 py-1 rounded"
                        onclick="decrease(${item.id})">

                        -

                    </button>

                    <span>

                        ${item.quantity}

                    </span>

                    <button
                        class="border px-3 py-1 rounded"
                        onclick="increase(${item.id})">

                        +

                    </button>

                </div>

                <div class="font-semibold">

                    $${subtotal.toFixed(2)}

                </div>

                <button
                    onclick="removeCart(${item.id})"
                    class="text-red-500 hover:text-red-700">

                    Remove

                </button>

            </div>

        </div>

        `;

    }).join("");

    document.getElementById("cart-total").textContent =
        "$" + total.toFixed(2);

    updateCartCount();

}

export function bindStaticAddButtons() {

    document.addEventListener("click", (e) => {

        const button = e.target.closest(".buttonAdd[data-id]");

        if (!button) return;

        if (button.closest("#menu-container")) return;

        const id = Number(button.dataset.id);

        addToCart(id);

    });

}

window.increase = increase;
window.decrease = decrease;
window.removeCart = removeCart;