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

    if (li.id === "games") {
      li.style.fontSize = "1.3rem";
      a.style.color = "rgb(169, 188, 224)";
      const ul = document.createElement("ul");
      ul.classList.add("dropdown-menu");

      item.children.forEach((child) => {
        const drop_li = document.createElement("li");
        const drop_a = document.createElement("a");
        drop_a.textContent = child.label;
        drop_a.href = child.url;
        drop_li.append(drop_a);
        ul.append(drop_li);
      });

      li.classList.add("dropdown");
      a.classList.add("dropdown-toggle");
      li.append(ul);

      let dropdownState = false;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        ul.style.display = dropdownState ? "none" : "flex";
        dropdownState = !dropdownState;
      });
    }
    navbarElement.append(li);
  });
}
