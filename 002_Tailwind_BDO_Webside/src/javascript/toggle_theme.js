const html = document.querySelector("html");
const toggle_theme_btn = document.querySelector(".toggle-theme-btn");
const theme_icon = document.querySelector(".theme-icon");
const logo_img = document.querySelector(".logo-img");

toggle_theme_btn.addEventListener("click", () => {
  const theme = html.dataset.theme;
  if (theme === "light") {
    html.dataset.theme = "dark";
    theme_icon.src = "/Tailwind_projects/002/src/assets/images/lightmode.png";
    logo_img.src = "/Tailwind_projects/002/src/assets/images/bdowhite.png";
    localStorage.setItem("theme", "dark");
  } else {
    html.dataset.theme = "light";
    theme_icon.src = "/Tailwind_projects/002/src/assets/images/darkmode.png";
    logo_img.src = "/Tailwind_projects/002/src/assets/images/bdoblack.png";
    localStorage.setItem("theme", "light");
  }
});

const savedTheme = localStorage.getItem("theme") || "light";

if (savedTheme === "dark") {
  html.dataset.theme = "dark";
  theme_icon.src = "/Tailwind_projects/002/src/assets/images/lightmode.png";
  logo_img.src = "/Tailwind_projects/002/src/assets/images/bdowhite.png";
} else {
  html.dataset.theme = "light";
  theme_icon.src = "/Tailwind_projects/002/src/assets/images/darkmode.png";
  logo_img.src = "/Tailwind_projects/002/src/assets/images/bdoblack.png";
}
