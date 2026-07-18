import "./style.css";
import { loadMenuItems } from "./js/data.js";
import { loadComponent } from "./js/component.js";
import { activePage } from "./js/navbar.js";
import { initTheme } from "./js/theme.js";
import { renderCart, updateCartCount, bindStaticAddButtons } from "./js/cart.js";
import { initMenu } from "./js/menu.js";
import { initContactForm } from "./js/contact.js";
import { showLoader, hideLoader } from "./js/loader.js";
import { initScrollReveal } from "./js/scrollReveal.js";
import { initBackToTop } from "./js/backToTop.js";

showLoader();

async function renderApp() {

    await loadMenuItems();
    await loadComponent("#navbar", "/components/navbar.html");
    await loadComponent("#footer", "/components/footer.html");
    activePage();
    initTheme();
    bindStaticAddButtons();
    const page = window.location.pathname.split("/").pop();
    updateCartCount();
    if (page === "menu.html") {
        initMenu();
    }
    if (page === "cart.html") {
        renderCart();
    }
    if (page === "contact.html") {
        initContactForm();
    }
    initScrollReveal();
    initBackToTop();
    hideLoader();
}
renderApp();