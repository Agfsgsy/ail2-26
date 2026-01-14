import PermissionsManager from "./components/PermissionsManager.js";

const app = document.querySelector("#app");
const nav = document.querySelector("#app-nav");
const authKey = "admin-authenticated";

const routes = {
  login: "./pages/Login.html",
  admin: "./pages/AdminDashboard.html",
};

const loadPage = async (route) => {
  const response = await fetch(routes[route]);
  const html = await response.text();
  app.innerHTML = html;
};

const isAuthenticated = () => localStorage.getItem(authKey) === "true";

const updateNav = () => {
  if (isAuthenticated()) {
    nav.innerHTML = `<button id="logout-btn">تسجيل الخروج</button>`;
    nav.querySelector("#logout-btn").addEventListener("click", () => {
      localStorage.removeItem(authKey);
      localStorage.removeItem("admin-profile");
      window.location.hash = "#/login";
    });
  } else {
    nav.innerHTML = "";
  }
};

const handleLogin = async () => {
  const form = document.querySelector("#login-form");
  const alert = document.querySelector("#login-alert");
  const adminData = await fetch("./data/admin.json").then((res) => res.json());

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = form.username.value.trim();
    const password = form.password.value.trim();

    if (username === adminData.username && password === adminData.password) {
      localStorage.setItem(authKey, "true");
      localStorage.setItem("admin-profile", JSON.stringify(adminData));
      window.location.hash = "#/admin";
    } else {
      alert.hidden = false;
      alert.textContent = "بيانات الدخول غير صحيحة. الرجاء المحاولة مرة أخرى.";
    }
  });
};

const handleDashboard = () => {
  const profile = JSON.parse(localStorage.getItem("admin-profile") || "{}");
  const adminName = document.querySelector("#admin-name");
  const adminRole = document.querySelector("#admin-role");

  adminName.textContent = profile.name || "مشرف النظام";
  adminRole.textContent = profile.role || "Super Admin";

  const sectionForm = document.querySelector("#section-form");
  const sectionAlert = document.querySelector("#section-alert");
  sectionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sectionAlert.hidden = false;
    sectionAlert.textContent = `تمت إضافة القسم: ${sectionForm["section-name"].value}`;
    sectionForm.reset();
  });

  const permissionsContainer = document.querySelector("#permissions-manager");
  new PermissionsManager(permissionsContainer);
};

const router = async () => {
  const route = window.location.hash.replace("#/", "") || "login";

  if (route === "admin" && !isAuthenticated()) {
    window.location.hash = "#/login";
    return;
  }

  await loadPage(route);
  updateNav();

  if (route === "login") {
    handleLogin();
  }

  if (route === "admin") {
    handleDashboard();
  }
};

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);
