import { settings } from "../settings/settings.js";
const navbarElement = document.querySelector("#navbar-elements");

export function createNavbar() {
  settings.navbar.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    li.id = item.id;
    a.textContent = item.label;
    a.href = item.url;
    li.append(a);
    navbarElement.append(li);
    if (li.id === "games") {
      li.style.fontSize = "1.3rem";
      a.style.color = "rgb(169, 188, 224)";
    }
    console.log("navbar test");
  });
}
