export function initBackToTop() {

    if (document.getElementById("back-to-top")) return;

    const button = document.createElement("button");
    button.id = "back-to-top";
    button.type = "button";
    button.setAttribute("aria-label", "Back to top");
    button.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;

    document.body.appendChild(button);

    const toggleVisibility = () => {
        if (window.scrollY > 400) {
            button.classList.add("show");
        } else {
            button.classList.remove("show");
        }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    button.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

}
