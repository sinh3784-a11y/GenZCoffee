import { getCurrentUser, logoutUser } from "./user.js";
import { updateCartCount } from "./cart.js";

export function activePage() {

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("nav a").forEach((link) => {

        const page = link.getAttribute("href").split("/").pop();

        link.classList.remove("active", "text-amber-700");

        if (page === currentPage) {

            link.classList.add("active", "text-amber-700");

        }

    });

    showCurrentUser();

    updateCartCount();

    initMobileMenu();

    initProfileMenu();

    initCartMenu();

    initLogout();

}

export function showCurrentUser() {

    const user = getCurrentUser();

    const loginBtn = document.getElementById("login");
    const profileBox = document.getElementById("profileBox");
    const username = document.getElementById("nav-username");

    if (user) {

        loginBtn?.classList.add("hidden");
        profileBox?.classList.remove("hidden");

        if (username) {
            username.textContent = user.username;
            username.classList.remove("hidden");
        }

    } else {

        loginBtn?.classList.remove("hidden");
        profileBox?.classList.add("hidden");

    }

}

function initMobileMenu() {

    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener("click", () => {

        const isOpen = !mobileMenu.classList.contains("hidden");

        if (isOpen) {
            mobileMenu.classList.add("hidden");
            mobileMenu.classList.remove("flex");
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        } else {
            mobileMenu.classList.remove("hidden");
            mobileMenu.classList.add("flex");
            menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        }

    });

    // Close the mobile menu once a link is tapped
    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
            mobileMenu.classList.remove("flex");
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });

}

function initProfileMenu() {

    const profileBtn = document.getElementById("profileBtn");
    const profileMenu = document.getElementById("profileMenu");

    if (!profileBtn || !profileMenu) return;

    profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        document.getElementById("cartMenu")?.classList.add("hidden");
        profileMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
        if (!profileMenu.contains(e.target) && e.target !== profileBtn) {
            profileMenu.classList.add("hidden");
        }
    });

}

function initCartMenu() {

    const cartBtn = document.getElementById("cartBtn");
    const cartMenu = document.getElementById("cartMenu");

    if (!cartBtn || !cartMenu) return;

    cartBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        // Close the profile menu if it happens to be open
        document.getElementById("profileMenu")?.classList.add("hidden");

        cartMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
        if (!cartMenu.contains(e.target) && e.target !== cartBtn) {
            cartMenu.classList.add("hidden");
        }
    });

}

function initLogout() {

    const logoutBtn = document.getElementById("logoutBtn");

    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", () => {
        logoutUser();
        window.location.href = "/src/pages/login.html";
    });

}

window.logoutUser = logoutUser;