//helper functions
import { getMenuWidth } from "./helpers/breakpoints.js";
import { setProgrammaticScroll, isProgrammaticScroll } from "./helpers/globals.js";

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
import { animateAboutUs } from "./animations/about-us.js";
import { animateOurStory } from "./animations/our-story.js";
import { setupPinnedSections } from "./animations/sectionStack.js";
import { animateFacilities } from "./animations/facilities.js";
import { animatePractical } from "./animations/practical.js";

document.addEventListener("DOMContentLoaded", () => {
    // helper functions
    getMenuWidth();
    setProgrammaticScroll();
    isProgrammaticScroll();


    // animations
    setupPinnedSections();
    initScrollSmoother();
    animateScrollIndicator();
    initScrollToLinks();
    initClickConfetti();
    initButtonWaveEffect();
    initCursorTrail();
    initBurgerAnimation();
    initMenuSlideToggle();
    animateHome();
    animateCohousing();
    animateAboutUs();
    animateOurStory();
    animateFacilities();
    animatePractical();
});