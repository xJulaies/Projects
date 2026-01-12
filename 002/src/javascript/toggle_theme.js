const html = document.querySelector("html");
const toggle_theme_btn = document.querySelector(".toggle-theme-btn");
const theme_icon = document.querySelector(".theme-icon");
const logo = document.querySelector(".logo");

toggle_theme_btn.addEventListener("click", () => {
  const theme = html.dataset.theme;
  if (theme === "light") {
    html.dataset.theme = "dark";
    theme_icon.src = "src/assets/lightmode.png";
    logo.src = "src/assets/bdowhite.png";
  } else {
    html.dataset.theme = "light";
    theme_icon.src = "src/assets/darkmode.png";
    logo.src = "src/assets/bdoblack.png";
  }
  console.log(html.dataset.theme);
});
