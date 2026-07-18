import { sendContactMessage } from "./api.js";
import { showToast } from "./toast.js";

export function initContactForm() {

    const sendBtn = document.getElementById("contact-send");

    if (!sendBtn) return;

    sendBtn.addEventListener("click", async () => {

        const name = document.getElementById("contact-name");
        const instagram = document.getElementById("contact-instagram");
        const message = document.getElementById("contact-message");
        const success = document.getElementById("contact-success");

        if (!name.value.trim() || !message.value.trim()) {
            alert("Please tell us your name and what's on your mind.");
            return;
        }

        sendBtn.disabled = true;

        try {

            await sendContactMessage({
                name: name.value.trim(),
                instagram: instagram.value.trim(),
                message: message.value.trim(),
            });

            if (success) {
                success.classList.remove("hidden");
            }

            name.value = "";
            instagram.value = "";
            message.value = "";

        } catch (err) {

            showToast("Couldn't send your message — please try again.", { icon: "fa-solid fa-triangle-exclamation" });

        } finally {

            sendBtn.disabled = false;

        }

    });

}
