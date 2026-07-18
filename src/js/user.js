import { loginRequest, signupRequest, logoutRequest, meRequest } from "./api.js";
import {
    saveUser,
    getUser,
    isLoggedIn,
    logout
} from "./storage.js";

export async function loginUser(identifier, password) {

    try {

        const account = await loginRequest(identifier, password);
        saveUser({
            id: account.id,
            username: account.username,
            email: account.email || ""
        });

        return { success: true };

    } catch (err) {

        return { success: false, message: err.message || "Username or Password is incorrect." };

    }

}

export async function registerUser(fullName, email, password) {

    const name = fullName.trim();
    const mail = email.trim().toLowerCase();

    if (!name || !mail || !password) {
        return { success: false, message: "Please fill in all fields." };
    }

    try {

        const account = await signupRequest(name, mail, password);

        saveUser({
            id: account.id,
            username: account.username,
            email: account.email
        });

        return { success: true };

    } catch (err) {

        return { success: false, message: err.message || "Could not create your account." };

    }

}

export function getCurrentUser() {
    return getUser();
}

export async function refreshSession() {

    const account = await meRequest();

    if (account) {
        saveUser(account);
    } else {
        logout();
    }

    return account;

}

export async function logoutUser() {

    try {
        await logoutRequest();
    } catch (err) {
        console.warn("Logout request failed, clearing local session anyway:", err.message);
    }

    logout();

}

window.logoutUser = logoutUser;

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", handleLogin);

    document
        .getElementById("password")
        ?.addEventListener("keydown", (e) => {

            if (e.key === "Enter") {

                handleLogin();

            }

        });

}

async function handleLogin() {

    const username = document
        .getElementById("username")
        .value
        .trim();

    const password = document
        .getElementById("password")
        .value
        .trim();

    const error = document.getElementById("loginError");

    if (!username || !password) {

        showError("Please enter username and password.");

        return;

    }

    const loginBtnEl = document.getElementById("loginBtn");
    loginBtnEl.disabled = true;

    const result = await loginUser(username, password);

    loginBtnEl.disabled = false;

    if (!result.success) {

        showError(result.message);

        return;

    }

    window.location.href = "/src/pages/home.html";

}

function showError(message) {

    const error = document.getElementById("loginError");

    if (!error) {

        alert(message);

        return;

    }

    error.textContent = message;

    error.classList.remove("hidden");

}

const createBtn = document.getElementById("createBtn");

if (createBtn) {

    createBtn.addEventListener("click", handleSignup);

}

async function handleSignup() {

    const fullName = document
        .getElementById("fullname")
        .value
        .trim();

    const email = document
        .getElementById("email")
        .value
        .trim();

    const password = document
        .getElementById("password")
        .value
        .trim();

    if (!fullName || !email || !password) {

        showSignupError("Please fill in all fields.");

        return;

    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        showSignupError("Please enter a valid email address.");

        return;

    }

    if (password.length < 6) {

        showSignupError("Password must be at least 6 characters.");

        return;

    }

    const createBtnEl = document.getElementById("createBtn");
    createBtnEl.disabled = true;

    const result = await registerUser(fullName, email, password);

    createBtnEl.disabled = false;

    if (!result.success) {

        showSignupError(result.message);

        return;

    }

    window.location.href = "/src/pages/home.html";

}

function showSignupError(message) {

    const error = document.getElementById("signupError");

    if (!error) {

        alert(message);

        return;

    }

    error.textContent = message;

    error.classList.remove("hidden");

}

export function protectPage() {

    if (!isLoggedIn()) {

        window.location.replace("/src/pages/login.html");

    }

}