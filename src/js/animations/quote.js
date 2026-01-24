import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function animateQuote() {
    const section = document.querySelector("#quote");
    if (!section) return;

    const container = section.querySelector(".quote__container");
    if (!container) return;

    if (prefersReducedMotion()) return;

    // Start state (collapsed/squashed)
    gsap.set(container, {
        transformOrigin: "50% 50%",
        scaleX: 0.85,
        scaleY: 0.85,
        autoAlpha: 0,
        y: 20
    });

    gsap.to(container, {
        scrollTrigger: {
            trigger: section,
            start: "top 35%",
            toggleActions: "play none none reverse",
            markers: false
        },
        autoAlpha: 1,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 1.25,
        ease: "elastic(1, 0.35)"
    });
}