//Import main SCSS so Vite compiles it automatically
// import "@/css/home.scss"; // Vite will handle Sass → CSS automatically

// animation imports
import { animateScrollIndicator } from "@/js/animations/scrollIndicator.js";
import { animateHome } from "@/js/animations/home.js";
import { initScrollToLinks } from "@/js/animations/scrollTo.js";
import { initClickConfetti } from "@/js/animations/confettiOnClick.js";
import { magneticButtonEffect } from "@/js/animations/animateButtons.js";
import { initSlider } from "@/js/animations/slider.js";
import { animateCohousing } from "@/js/animations/cohousing.js";
import { animateTransitionArms } from "@/js/animations/animateTransitionArms.js";
import { animateAboutUs } from "@/js/animations/about-us.js";
import { animateOurStory } from "@/js/animations/our-story.js";
import { setupPinnedSections } from "@/js/animations/sectionStack.js";
import { animateFacilities } from "@/js/animations/facilities.js";
import { animateQuote } from "@/js/animations/quote.js";
import { animateInsights } from "@/js/animations/insights.js";
import { animatePortal } from "@/js/animations/portal.js";

export default function initHomePage() {
    // Home page animations
    console.log("Initializing home page animations...");

    setupPinnedSections();
    animateScrollIndicator();
    initScrollToLinks();
    initClickConfetti();
    magneticButtonEffect();
    animateHome();
    initSlider();
    animateCohousing();
    animateTransitionArms();
    animateAboutUs();
    animateOurStory();
    animateFacilities();
    animateQuote();
    animateInsights();
    animatePortal();
}