import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function animateInsights() {
    const section = document.querySelector("#insights");
    if (!section) return;

    const title = section.querySelector(".insights__title h2");
    const cards = section.querySelectorAll(".card--insights");
    const cta = section.querySelector(".insights__cta .button");

    if (!title || !cards.length || !cta) return;
    
    if (prefersReducedMotion()) return;

    const breakpoint = getCurrentBreakpoint();
    const isDesktop = breakpoint === "desktop";

    // Remove parallax attributes on non-desktop
    cards.forEach((card) => {
        if (!isDesktop) {
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
        y: isDesktop ? 60 : -60,
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
            x: !isDesktop ? (isEven ? -100 : 100) : 0,
            y: isDesktop ? 80 : 0,
            opacity: 0,
            duration: 1,
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
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    });
}
