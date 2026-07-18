export function showLoader() {

    if (document.getElementById("page-loader")) return;

    const loader = document.createElement("div");
    loader.id = "page-loader";
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.prepend(loader);

}

export function hideLoader() {

    const loader = document.getElementById("page-loader");

    if (!loader) return;

    loader.classList.add("loader-hidden");

    setTimeout(() => loader.remove(), 400);

}
