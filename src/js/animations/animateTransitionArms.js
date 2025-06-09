import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";

gsap.registerPlugin(ScrollTrigger);

export function animateTransitionArms() {
    const breakpoint = getCurrentBreakpoint();
    if (breakpoint !== "desktop") return; // Only run on desktop

    const section = document.querySelector("#cohousing");
    const armsContainer = document.querySelector(".transition__arms");
    if (!section || !armsContainer) return;

    const arms = {
        left: armsContainer.querySelector(".arm--left"),
        right: armsContainer.querySelector(".arm--right"),
        top: armsContainer.querySelector(".arm--top"),
        bottom: armsContainer.querySelector(".arm--bottom"),
        bottomRight: armsContainer.querySelector(".arm--bottom-right"),
    };

    if (!Object.values(arms).every(Boolean)) return;

    const leftWidth = arms.left.getBoundingClientRect().width;
    const rightWidth = arms.right.getBoundingClientRect().width;
    const topHeight = arms.top.getBoundingClientRect().height;
    const bottomHeight = arms.bottom.getBoundingClientRect().width;
    const bottomRightHeight = arms.bottomRight.getBoundingClientRect().height;

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
        { y: 0, x: -45, rotation: 45, autoAlpha: 0 },
        { y: topHeight, x: 0, rotation: 0, duration: 1, autoAlpha: 1, ease: "power2.out" }
    );

    tl.fromTo(arms.bottomRight,
        { y: 0, x: -90, rotation: -90, autoAlpha: 0 },
        { y: -bottomRightHeight, x: 0, rotation: 0, duration: 1, autoAlpha: 1, ease: "power2.out" },
        "-=0.75"
    );

    tl.fromTo(arms.right,
        { x: 100, rotation: 35, autoAlpha: 0 },
        { x: -rightWidth, rotation: 0, duration: 1, autoAlpha: 1, ease: "power2.out" },
        "-=0.75"
    );

    tl.fromTo(arms.left,
        { x: -100, y: 100, rotation: 30, autoAlpha: 0 },
        { x: leftWidth - 10, y: 0, rotation: 10, duration: 1, autoAlpha: 1, ease: "power2.out" },
        "-=0.75"
    );

    tl.fromTo(arms.bottom,
        { y: 0, rotation: 90, autoAlpha: 0 },
        { y: -bottomHeight, rotation: 90, duration: 1, autoAlpha: 1, ease: "power2.out" },
        "-=0.75"
    );
}