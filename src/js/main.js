import AOS from "aos";
import "aos/dist/aos.css";

const nav = document.querySelector("#menu-principal");
const menuToggle = document.querySelector(".menu-toggle");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open");
  });
}

const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
const recipeCards = Array.from(document.querySelectorAll(".recipe-card"));
const status = document.querySelector("#filter-status");

function updateFilter(activeFilter) {
  let visibleCount = 0;

  recipeCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");
    const isVisible = activeFilter === "all" || activeFilter === cardCategory;

    card.classList.toggle("is-hidden", !isVisible);
    if (isVisible) {
      visibleCount += 1;
    }
  });

  if (status) {
    status.textContent = `Mostrando ${visibleCount} receta${visibleCount === 1 ? "" : "s"}.`;
  }
}

if (filterButtons.length > 0 && recipeCards.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((otherButton) => {
        const isCurrent = otherButton === button;
        otherButton.classList.toggle("is-selected", isCurrent);
        otherButton.setAttribute("aria-pressed", String(isCurrent));
      });

      updateFilter(button.dataset.filter || "all");
    });
  });
}

AOS.init({
  duration: 700,
  once: true,
  easing: "ease-out-cubic"
});
