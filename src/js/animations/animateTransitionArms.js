import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function animateTransitionArms() {
    // Respect reduced motion setting
    if (prefersReducedMotion()) return;

    const breakpoint = getCurrentBreakpoint();
    if (breakpoint !== "desktop") return; // Only run on desktop

    const section = document.querySelector("#cohousing");
    const armsContainer = document.querySelector(".transition__arms");
    if (!section || !armsContainer) return;

    const arms = {
        left: armsContainer.querySelector(".arm--left"),
        right: armsContainer.querySelector(".arm--right"),
        bottomRight: armsContainer.querySelector(".arm--bottom-right"),
    };

    if (!Object.values(arms).every(Boolean)) return;

    // Use same offset as in SCSS
    const armOffset = 12;
    const armOffsetY = 12; //increase this and then match the value for _transition-arms.scss if it still looks off on laptop

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 45%",
            end: "bottom 85%",
            toggleActions: "play reverse restart reverse",
            markers: false,
        },
    });

    tl.fromTo(arms.bottomRight,
        { y: 0, x: "-6vw", rotation: -90, autoAlpha: 0 },
        { y: `-${armOffsetY}vw`, x: "0vw", rotation: 0, duration: 1, autoAlpha: 1, ease: "power2.out" }
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
