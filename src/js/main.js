//helper functions
import { getMenuWidth } from "./helpers/breakpoints.js";

// animations
import { initScrollSmoother } from "./animations/scrollSmoother.js";
import { animateScrollIndicator } from "./animations/scrollIndicator.js";
import { animateHome } from "./animations/home.js";
import { initScrollToLinks } from "./animations/scrollTo.js";
import { initClickConfetti } from "./animations/confettiOnClick.js";
import { initButtonWaveEffect } from "./animations/buttonWaveEffect.js";
import { initCursorTrail } from "./animations/cursorTrail.js";
import { animateCohousing } from "./animations/cohousing.js";
import { initBurgerAnimation } from "./animations/burger.js";
import { initMenuSlideToggle } from "./animations/menu.js";

document.addEventListener("DOMContentLoaded", () => {
    getMenuWidth();
    animateHome();
    initScrollSmoother();
    animateScrollIndicator();
    initScrollToLinks();
    initClickConfetti();
    initButtonWaveEffect();
    initCursorTrail();
    animateCohousing();
    initBurgerAnimation();
    initMenuSlideToggle();
});