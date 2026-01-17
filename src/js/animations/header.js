import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);

export function animateHeader() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Scroll observer for header show/hide
    Observer.create({
        type: "wheel,touch,pointer",
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

    // Show/hide header on scroll
    // ScrollTrigger.create({
    //     start: "top top",
    //     end: "max",
    //     // markers: true,
    //     onUpdate: (self) => {
    //         self.direction === -1 ? showAnim.play() : showAnim.reverse()
    //     }
    // });
}