import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";

gsap.registerPlugin(ScrollTrigger);

export function animateTransitionArms() {
    // Respect reduced motion setting
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const breakpoint = getCurrentBreakpoint();
    if (breakpoint !== "desktop") return; // Only run on desktop

    const section = document.querySelector("#cohousing");
    const armsContainer = document.querySelector(".transition__arms");
    if (!section || !armsContainer) return;

    const arms = {
        left: armsContainer.querySelector(".arm--left"),
        right: armsContainer.querySelector(".arm--right"),
        top: armsContainer.querySelector(".arm--top"),
        bottomRight: armsContainer.querySelector(".arm--bottom-right"),
    };

    if (!Object.values(arms).every(Boolean)) return;

    // Use same offset as in SCSS: -12vw (so we animate with ±12vw)
    const armOffset = 12;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom 85%",
            toggleActions: "play reverse restart reverse",
            markers: false,
        },
    });

    tl.fromTo(arms.top,
        { y: 0, x: "-3vw", rotation: 45, autoAlpha: 0 },
        { y: `${armOffset}vw`, x: "0vw", rotation: 0, duration: 1, autoAlpha: 1, ease: "power2.out" }
    );

    tl.fromTo(arms.bottomRight,
        { y: 0, x: "-6vw", rotation: -90, autoAlpha: 0 },
        { y: `-${armOffset}vw`, x: "0vw", rotation: 0, duration: 1, autoAlpha: 1, ease: "power2.out" },
        "-=0.75"
    );

    tl.fromTo(arms.right,
        { x: "6vw", rotation: 35, autoAlpha: 0 },
        { x: `-${armOffset}vw`, rotation: 0, duration: 1, autoAlpha: 1, ease: "power2.out" },
        "-=0.75"
    );

    tl.fromTo(arms.left,
        { x: "-6vw", y: "6vw", rotation: 30, autoAlpha: 0 },
        { x: `${armOffset - 1}vw`, y: "0vw", rotation: 10, duration: 1, autoAlpha: 1, ease: "power2.out" },
        "-=0.75"
    );
}
