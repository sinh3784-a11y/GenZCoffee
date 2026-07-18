export function initScrollReveal() {

    const items = document.querySelectorAll(".reveal");

    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                observer.unobserve(entry.target);
            }

        });

    }, { threshold: 0.15 });

    items.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index % 4, 3) * 0.08}s`;
        observer.observe(item);
    });

}
