const body = document.querySelector("body");
const keyboard = document.querySelector(".keyboard");
const keyboardRows = document.querySelectorAll(".keyboard_row");
const header = document.querySelector("header");
const main = document.querySelector("main");
const boxes = document.querySelectorAll(".box");
const toggleButton = document.getElementById("toggle-theme");
const lightIcon = `<svg width="29" height="29" viewBox="0 0 24 24">
  <path
    fill="currentColor"
    d="M12 17q-2.075 0-3.537-1.463T7 12t1.463-3.537T12 7t3.538 1.463T17 12t-1.463 3.538T12 17M2 13q-.425 0-.712-.288T1 12t.288-.712T2 11h2q.425 0 .713.288T5 12t-.288.713T4 13zm18 0q-.425 0-.712-.288T19 12t.288-.712T20 11h2q.425 0 .713.288T23 12t-.288.713T22 13zm-8-8q-.425 0-.712-.288T11 4V2q0-.425.288-.712T12 1t.713.288T13 2v2q0 .425-.288.713T12 5m0 18q-.425 0-.712-.288T11 22v-2q0-.425.288-.712T12 19t.713.288T13 20v2q0 .425-.288.713T12 23M5.65 7.05L4.575 6q-.3-.275-.288-.7t.288-.725q.3-.3.725-.3t.7.3L7.05 5.65q.275.3.275.7t-.275.7t-.687.288t-.713-.288M18 19.425l-1.05-1.075q-.275-.3-.275-.712t.275-.688q.275-.3.688-.287t.712.287L19.425 18q.3.275.288.7t-.288.725q-.3.3-.725.3t-.7-.3M16.95 7.05q-.3-.275-.288-.687t.288-.713L18 4.575q.275-.3.7-.288t.725.288q.3.3.3.725t-.3.7L18.35 7.05q-.3.275-.7.275t-.7-.275M4.575 19.425q-.3-.3-.3-.725t.3-.7l1.075-1.05q.3-.275.712-.275t.688.275q.3.275.288.688t-.288.712L6 19.425q-.275.3-.7.288t-.725-.288"
  />
  </svg>`;

const moonIcon = `<svg width="27" height="27" viewBox="0 0 16 16"><path fill="currentColor" d="M6 .278a.77.77 0 0 1 .08.858a7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316a.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71C0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/></svg>`;

let userPrefer = window.matchMedia("(prefers-color-scheme: dark)").matches;
let theme = localStorage.getItem("theme");

if (!theme) {
  localStorage.setItem("theme", userPrefer);
}

let themeStatus = theme === "true";

function handleIcon() {
  if (themeStatus) {
    toggleButton.innerHTML = lightIcon;
  } else {
    toggleButton.innerHTML = moonIcon;
  }
}

handleIcon();

function setThemeSystem(elements) {
  elements.forEach((element) => {
    if (element instanceof NodeList) {
      element.forEach((subElement) => {
        theme === "true"
          ? subElement.classList.add("dark")
          : subElement.classList.add("light");
      });
    } else {
      theme === "true"
        ? element.classList.add("dark")
        : element.classList.add("light");
    }
  });
}

setThemeSystem([body, keyboard, keyboardRows, header, main, boxes]);

function toggleThemeMode(elements) {
  elements.forEach((element) => {
    if (element instanceof NodeList) {
      element.forEach((subElement) => {
        if (subElement.classList.contains("dark")) {
          subElement.classList.replace("dark", "light");
        } else if (subElement.classList.contains("light")) {
          subElement.classList.replace("light", "dark");
        }
      });
    } else {
      if (element.classList.contains("dark")) {
        element.classList.replace("dark", "light");
      } else if (element.classList.contains("light")) {
        element.classList.replace("light", "dark");
      }
    }
  });
}

toggleButton.addEventListener("click", () => {
  toggleThemeMode([body, keyboard, keyboardRows, header, main, boxes]);
  toggleButton.blur();
  themeStatus = !themeStatus;
  localStorage.setItem("theme", themeStatus);
  handleIcon();
});