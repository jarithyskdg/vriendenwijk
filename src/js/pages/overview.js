import { renderCards } from "@/js/components/renderCards.js";

// animation imports
import { animateOverviewLinks } from "@/js/animations/links.js";
import { animateOverviewHeader, animateOverviewSections } from "@/js/animations/overview.js";
import { initScrollToLinks } from "@/js/animations/scrollTo.js";

function nextFrame() {
    return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

export default async function initOverviewPage() {
    // Prevent flash until GSAP has set initial states
    document.body.classList.add("is-overview-animating");

    await renderCards();

    console.log("Initializing overview page animations...");

    // Setup GSAP initial states + ScrollTriggers while content is still gated
    animateOverviewLinks();
    animateOverviewHeader();
    animateOverviewSections();
    initScrollToLinks();

    // Let a frame pass so gsap.set() is applied, then reveal
    await nextFrame();
    document.body.classList.remove("is-overview-animating");
}