//Import main SCSS so Vite compiles it automatically
import "@/css/style.scss"; // Vite will handle Sass → CSS automatically

//helper functions
import { waitForFonts } from "@/js/helpers/fonts.js";
import { getMenuWidth } from "@/js/helpers/breakpoints.js";
import { setProgrammaticScroll, isProgrammaticScroll } from "@/js/helpers/globals.js";
import { onReducedMotionChange } from "@/js/helpers/reducedMotion.js";

// animations
import { initScrollSmoother } from "@/js/animations/scrollSmoother.js";
import { initCursorTrail } from "@/js/animations/cursorTrail.js";
import { initBurgerAnimation } from "@/js/animations/burger.js";
import { animateHeader } from "@/js/animations/header.js";
import { initMenuSlideToggle, menuItemHoverEffect } from "@/js/animations/menu.js";
import { animateFooter, animateFooterLinks } from "@/js/animations/footer.js";

document.addEventListener("DOMContentLoaded", async () => {
    // helper functions
    await waitForFonts();
    
    getMenuWidth();
    setProgrammaticScroll();
    isProgrammaticScroll();
    onReducedMotionChange(() => {
        window.location.reload();
    });

    // global animations
    initScrollSmoother();
    animateHeader();
    initCursorTrail();
    initBurgerAnimation();
    initMenuSlideToggle();
    menuItemHoverEffect();
    animateFooter();
    animateFooterLinks();

    // page-specific logic
    const page = document.body.dataset.page;
    if (page) {
        try {
            const module = await import(`@/js/pages/${page}.js`);
            if (typeof module.default === "function") module.default();
        } catch (err) {
            console.warn(`No JS found for page: ${page}`);
        }
    }
});