import { menuItems } from "./data.js";
import { addToCart } from "./cart.js";
import { initScrollReveal } from "./scrollReveal.js";

let currentCategory = "all";

export function displayMenu(items = menuItems) {
    const menuContainer = document.getElementById("menu-container");
    if (!menuContainer) return;
    menuContainer.innerHTML = items.map(item => `
        <div class="card1 reveal">
            <div class="card1_image">
                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="image1">
                  <div class="star1">
                    ★ ${item.rating}
                </div>
            </div>
            <div class="text-center">
                <h2 class="font-bold text-lg">
                    ${item.name}
                </h2>
                <p class="text-sm mt-2">
                       ${item.description}
                </p>
            </div>
            <div class="card1_price">
                <h3 class="font-semibold">
                    $${item.price.toFixed(2)}
                </h3>
            </div>
            <div class="card1_button">
                <button
                    class="buttonAdd color6 rounded-xl"
                    data-id="${item.id}">
                    Order Now
                </button>
            </div>
        </div>
    `).join("");
    bindButtons();
    initScrollReveal();
}

function bindButtons() {
    document.querySelectorAll(".buttonAdd")
        .forEach(button => {
            button.addEventListener("click", () => {
                const id = Number(button.dataset.id);
                addToCart(id);
            });

        });
}

export function filterMenu(category) {
    currentCategory = category;
    let products = menuItems;
    if (category !== "all") {
        products = menuItems.filter(item =>
            item.category === category
        );
    }
    const keyword =
        document
            .getElementById("search-product")
            ?.value
            .toLowerCase() || "";
    if (keyword) {
        products = products.filter(item =>
            item.name.toLowerCase().includes(keyword) ||
            item.description.toLowerCase().includes(keyword)
          );
    }
     displayMenu(products);
}

export function initSearch() {
    const search =
        document.getElementById("search-product");
    if (!search) return;
        search.addEventListener("input", () => {
            filterMenu(currentCategory);
    });

}

export function initCategoryButtons() {
    document.querySelectorAll(".btnMenu")
        .forEach(btn => {
            btn.addEventListener("click", () => {
                document.querySelectorAll(".btnMenu")
                    .forEach(b => b.classList.remove("active-style"));
                btn.classList.add("active-style");
                filterMenu(btn.dataset.category);
            });

        });

}

export function initMenu() {

    displayMenu();

    initSearch();

    initCategoryButtons();

}