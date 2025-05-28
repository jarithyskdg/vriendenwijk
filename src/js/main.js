import { initScrollSmoother } from "./animations/scrollSmoother.js";
import { animateScrollIndicator } from "./animations/scrollIndicator.js";
import { animateHome } from "./animations/home.js";
import { initScrollToLinks } from "./animations/scrollTo.js";
import { initClickConfetti } from "./animations/confettiOnClick.js";
import { initButtonWaveEffect } from "./animations/buttonWaveEffect.js";
import { initCursorTrail } from "./animations/cursorTrail.js";

document.addEventListener("DOMContentLoaded", () => {
    animateHome();
    initScrollSmoother();
    animateScrollIndicator();
    initScrollToLinks();
    initClickConfetti();
    initButtonWaveEffect();
    initCursorTrail();
});