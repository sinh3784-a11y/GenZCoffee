export async function loadComponent(selector, filepath) {
    try {
        const response = await fetch(filepath);
        if (!response.ok) throw new Error(`Failed to load ${filepath}`);
        const html = await response.text();
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error(error);
    }
}