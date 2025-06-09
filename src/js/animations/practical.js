import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";

gsap.registerPlugin(ScrollTrigger);

export function animatePractical() {
    const section = document.querySelector("#practical");
    const img = section.querySelector(".practical__img img");
    const cards = section.querySelectorAll(".card--practical");

    if (!section || !img || !cards.length) return;

    const breakpoint = getCurrentBreakpoint();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let startValue, endValue;

    if (breakpoint === "mobile") {
        startValue = "top 75%";
        endValue = "30% 40%";
    } else if (breakpoint === "tablet") {
        startValue = "top 75%";
        endValue = "25% 40%";
    } else {
        startValue = "20% 85%";
        endValue = "center center";
    }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: startValue,
            end: endValue,
            toggleActions: "play none none reverse",
            scrub: 1,
            markers: false
        }
    });

    // Use conditional logic per breakpoint
    const animateCard = (card, index) => {
        const fromDirection = index % 2 === 0 ? -50 : 50;

        tl.from(card, {
            x: prefersReducedMotion ? 0 : fromDirection,
            y: prefersReducedMotion ? 0 : 50,
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 0.8,
            duration: prefersReducedMotion ? 0.4 : 0.6,
            ease: prefersReducedMotion ? "power1.out" : "power3.out"
        }, `-=${0.4 - index * 0.03}`);
    };

    if (breakpoint === "desktop") {
        tl.from(img, {
            x: prefersReducedMotion ? 0 : 100,
            opacity: 0,
            duration: prefersReducedMotion ? 0.5 : 1,
            ease: "power3.out"
        });

        cards.forEach(animateCard);
    } else {
        cards.forEach(animateCard);

        tl.from(img, {
            x: prefersReducedMotion ? 0 : 100,
            opacity: 0,
            duration: prefersReducedMotion ? 0.5 : 1,
            ease: "power3.out"
        });
    }
}
