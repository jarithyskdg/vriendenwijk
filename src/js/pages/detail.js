//Import main SCSS so Vite compiles it automatically
// import "@/css/detail.scss"; // Vite will handle Sass → CSS automatically

import { renderDetail } from "@/js/components/renderDetail.js";

// animation imports
import { detailContentSwitcher } from "@/js/animations/detailContentSwitcher.js";
import { magneticButtonEffect } from "@/js/animations/animateButtons.js";
import { initSlider } from "@/js/animations/slider";
import { animateDetail } from "@/js/animations/detail.js";


export default async function initDetailPage() {
    // Detail page animations
    console.log("Initializing detail page animations...");

    await renderDetail();

    animateDetail();
    initSlider();
    detailContentSwitcher();
    magneticButtonEffect();
}