import { getUser } from "./storage.js";

const API_BASE = "https://GenZCoffee.com/api"; // TODO: point this at your real API

async function request(path, { method = "GET", body, headers = {} } = {}) {

    let res;

    try {

        res = await fetch(`${API_BASE}${path}`, {
            method,
            credentials: "include", // sends/receives the session cookie
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
        });

    } catch (err) {

        // fetch() itself threw: unreachable host, offline, CORS, etc.
        err.isNetworkError = true;
        throw err;

    }

    const data = res.status !== 204 ? await res.json().catch(() => null) : null;

    if (!res.ok) {
        const message = data?.message || `Request failed (${res.status})`;
        throw new Error(message);
    }

    return data;

}

const LOCAL_ACCOUNTS_KEY = "genz_local_accounts";

function getLocalAccounts() {

    const stored = JSON.parse(localStorage.getItem(LOCAL_ACCOUNTS_KEY));

    if (stored) return stored;

    // Seed the one demo account documented in the README.
    const seeded = [
        { id: 1, username: "tfu", email: "tfu@example.com", password: "tfu123" },
    ];

    localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(seeded));

    return seeded;

}

function saveLocalAccounts(accounts) {
    localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(accounts));
}

function toPublicAccount(account) {
    return { id: account.id, username: account.username, email: account.email };
}

function localLogin(identifier, password) {

    const target = identifier.trim().toLowerCase();

    const account = getLocalAccounts().find(
        (a) => a.username.toLowerCase() === target || a.email.toLowerCase() === target
    );

    if (!account || account.password !== password) {
        throw new Error("Username or Password is incorrect.");
    }

    return toPublicAccount(account);

}

function localSignup(fullName, email, password) {

    const accounts = getLocalAccounts();
    const mail = email.trim().toLowerCase();

    if (accounts.some((a) => a.email.toLowerCase() === mail)) {
        throw new Error("An account with that email already exists.");
    }

    const account = {
        id: Date.now(),
        username: fullName.trim(),
        email: mail,
        password,
    };

    accounts.push(account);
    saveLocalAccounts(accounts);

    return toPublicAccount(account);

}

// ---------- Menu ----------

export const fetchMenu = () => request("/menu");

// ---------- Auth ----------

export async function loginRequest(identifier, password) {

    try {
        return await request("/auth/login", { method: "POST", body: { identifier, password } });
    } catch (err) {
        if (!err.isNetworkError) throw err;
        return localLogin(identifier, password);
    }

}

export async function signupRequest(fullName, email, password) {

    try {
        return await request("/auth/signup", { method: "POST", body: { fullName, email, password } });
    } catch (err) {
        if (!err.isNetworkError) throw err;
        return localSignup(fullName, email, password);
    }

}

export async function logoutRequest() {

    try {
        return await request("/auth/logout", { method: "POST" });
    } catch (err) {
        if (!err.isNetworkError) throw err;
        return null; // storage.js already clears the local session cache
    }

}

export const meRequest = async () => {

    try {
        return await request("/auth/me");
    } catch (err) {
        return err.isNetworkError ? getUser() : null;
    }

};

// ---------- Contact ----------

export async function sendContactMessage(payload) {

    try {
        return await request("/contact", { method: "POST", body: payload });
    } catch (err) {
        if (!err.isNetworkError) throw err;
        return { success: true }; // decorative fallback — no backend to submit to
    }

}

// ---------- Cart (optional server sync) ----------

export const fetchCart = () => request("/cart");

export const saveCartRequest = (cart) =>
    request("/cart", { method: "PUT", body: { cart } });
