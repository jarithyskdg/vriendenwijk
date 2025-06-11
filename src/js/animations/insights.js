import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";

gsap.registerPlugin(ScrollTrigger);

export function animateInsights() {
    const section = document.querySelector("#insights");
    if (!section) return;

    const title = section.querySelector(".insights__content__title h2");
    const cards = section.querySelectorAll(".card--insights");
    const cta = section.querySelector(".insights__cta .button");

    const breakpoint = getCurrentBreakpoint();
    const isDesktop = breakpoint === "desktop";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Remove parallax attributes on non-desktop or reduced motion
    cards.forEach((card) => {
        if (!isDesktop || prefersReducedMotion) {
            card.removeAttribute("data-speed");
            card.removeAttribute("data-lag");
        }
    });

    // Animate section title
    gsap.from(title, {
        scrollTrigger: {
            trigger: isDesktop ? section : title,
            start: isDesktop ? "top 80%" : "top 90%",
            end: isDesktop ? "center center" : "top center",
            scrub: 1,
            markers: false
        },
        y: prefersReducedMotion ? 0 : isDesktop ? 60 : -60,
        opacity: 0,
        ease: "power2.out"
    });

    // Animate cards
    cards.forEach((card, index) => {
        const isEven = index % 2 === 0;

        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top center",
                // scrub: 1,
                markers: false
            },
            x: prefersReducedMotion ? 0 : !isDesktop ? (isEven ? -100 : 100) : 0,
            y: prefersReducedMotion ? 0 : isDesktop ? 80 : 0,
            opacity: 0,
            duration: prefersReducedMotion ? 0.3 : 1,
            ease: "power2.out"
        });
    });

    // CTA fade-in
    gsap.from(cta, {
        scrollTrigger: {
            trigger: isDesktop ? section : cta,
            start: isDesktop ? "40% 60%" : "top bottom",
            end: isDesktop ? "center center" : "top 90%",
            scrub: 1,
            markers: false
        },
        scale: prefersReducedMotion ? 1 : 0.9,
        opacity: 0,
        duration: prefersReducedMotion ? 0.3 : 0.6,
        ease: "power2.out"
    });
}
