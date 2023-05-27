const btn = document.querySelector(".header__nav--btns");
const list = document.querySelector(".header__list--mobile");
const icon = document.querySelector(".fa-bars");

document.addEventListener("DOMContentLoaded", function () {
  const text = document.querySelector("#shots__title--mobile");

  function updateText() {
    if (window.innerWidth <= 768) {
      text.innerText = "- Last Instagram Shot";
    } else {
      text.innerText = "- Latest Instagram Shots";
    }
  }

  updateText();

  window.addEventListener("resize", updateText);
});

list.style.display = "none";

icon.addEventListener("click", () => {
  if (list.style.display == "flex") {
    list.style.display = "none";
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  } else {
    list.style.display = "flex";
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  }
});
