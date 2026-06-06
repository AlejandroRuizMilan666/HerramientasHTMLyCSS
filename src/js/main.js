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
    const cardCategories = (card.getAttribute("data-category") || "").split(" ");
    const isVisible = activeFilter === "all" || cardCategories.includes(activeFilter);

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

const youtubeFacade = document.querySelector(".youtube-facade");
if (youtubeFacade) {
  youtubeFacade.addEventListener("click", () => {
    const videoId = youtubeFacade.dataset.videoId;
    const title = youtubeFacade.dataset.title || "Video de YouTube";
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.title = title;
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;
    iframe.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0;";
    youtubeFacade.replaceWith(iframe);
  });
}

(async function initAOS() {
  if (!document.querySelector("[data-aos]")) return;
  try {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const aosModule = await import("aos");
    await import("aos/dist/aos.css");

    const AOS =
      aosModule?.default?.default ||
      aosModule?.default ||
      aosModule?.AOS ||
      aosModule;

    if (typeof AOS?.init === "function") {
      AOS.init({
        duration: prefersReducedMotion ? 0 : 700,
        once: true,
        easing: "ease-out-cubic",
        disable: prefersReducedMotion,
      });
    } else {
      console.warn("AOS cargado sin metodo init; se omite inicializacion.");
    }
  } catch (error) {
    console.error("No se pudo inicializar AOS:", error);
  }
})();
