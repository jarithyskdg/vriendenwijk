import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);

export function animateHeader() {
    if (prefersReducedMotion()) return;

    // Scroll observer for header show/hide
    Observer.create({
        type: "wheel,touch",
        onUp: () => showAnim.reverse(),
        onDown: () => showAnim.play(),
        wheelSpeed: -1, //invert wheel direction and switch onUP and onDown so that scrolling and swiping behaves the same
        preventDefault: false,
        allowClicks: true,
        tolerance: 10,
        enabled: true
    });

    // Header hide/show animation
    const showAnim = gsap.from('.header__navbar', {
        yPercent: -100,
        paused: true,
        duration: 0.2
    }).progress(1);
}