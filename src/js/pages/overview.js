//Import main SCSS so Vite compiles it automatically
// import "@/css/overview.scss"; // Vite will handle Sass → CSS automatically

// animation imports
import { animateOverviewLinks } from "@/js/animations/links.js";
import { animateOverviewHeader, animateOverviewSections } from "@/js/animations/overview.js";
import { initScrollToLinks } from "@/js/animations/scrollTo.js";


export default function initOverviewPage() {
    // Overview page animations
    console.log("Initializing overview page animations...");

    animateOverviewLinks();
    animateOverviewHeader();
    animateOverviewSections();
    initScrollToLinks();


}