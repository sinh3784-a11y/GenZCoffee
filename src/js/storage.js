const USER_KEY = "genz_user";
const CART_KEY = "genz_cart";

// ---------- USER ----------

export function saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
}

export function isLoggedIn() {
    return getUser() !== null;
}

export function logout() {
    localStorage.removeItem(USER_KEY);
    window.location.href = "/src/pages/login.html";
}

// ---------- CART ----------

export function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function clearCart() {
    localStorage.removeItem(CART_KEY);
}

export function cartCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
}