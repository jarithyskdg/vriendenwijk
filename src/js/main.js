// main.js
import { initScrollSmoother } from "./animations/scrollSmoother.js";
import { animateScrollIndicator } from "./animations/scrollIndicator.js";
import { animateHome } from "./animations/home.js";
import { initScrollToLinks } from "./animations/scrollTo.js";

document.addEventListener("DOMContentLoaded", () => {
    animateHome();
    initScrollSmoother();
    animateScrollIndicator();
    initScrollToLinks();
});