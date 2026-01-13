const html = document.querySelector("html");
const toggle_theme_btn = document.querySelector(".toggle-theme-btn");
const theme_icon = document.querySelector(".theme-icon");
const logo_img = document.querySelector(".logo-img");

toggle_theme_btn.addEventListener("click", () => {
  const theme = html.dataset.theme;
  if (theme === "light") {
    html.dataset.theme = "dark";
    theme_icon.src = "/002/src/assets/lightmode.png";
    logo_img.src = "/002/src/assets/bdowhite.png";
  } else {
    html.dataset.theme = "light";
    theme_icon.src = "/002/src/assets/darkmode.png";
    logo_img.src = "/002/src/assets/bdoblack.png";
  }
});
