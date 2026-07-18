function getContainer() {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }
    return container;
}

export function showToast(message, { icon = "fa-solid fa-circle-check", duration = 2200 } = {}) {

    const container = getContainer();

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="${icon}"></i><span>${message}</span>`;

    container.appendChild(toast);

    // Force reflow so the transition runs, then show.
    requestAnimationFrame(() => {
        toast.classList.add("toast-show");
    });

    setTimeout(() => {
        toast.classList.remove("toast-show");
        toast.classList.add("toast-hide");
        toast.addEventListener("transitionend", () => toast.remove(), { once: true });
    }, duration);

}
