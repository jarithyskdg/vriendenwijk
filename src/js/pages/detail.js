//Import main SCSS so Vite compiles it automatically
// import "@/css/detail.scss"; // Vite will handle Sass → CSS automatically

// animation imports
import { detailContentSwitcher } from "@/js/animations/detailContentSwitcher.js";
import { animateDetail } from "@/js/animations/detail.js";


export default function initDetailPage() {
    // Detail page animations
    console.log("Initializing detail page animations...");

    animateDetail();
    detailContentSwitcher();
}