import renderHome from "./scripts/pages/home.js";

const pathname = window.location.pathname;
if (pathname.includes("index")) {
  renderHome();
}
if (!pathname.includes("/")) {
  renderHome();
}
