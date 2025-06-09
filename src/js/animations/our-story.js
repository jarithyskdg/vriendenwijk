import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";

gsap.registerPlugin(ScrollTrigger);

export function animateOurStory() {
    const section = document.querySelector("#our-story");
    const logo = section.querySelector(".logo--small");
    const title = section.querySelector(".our-story__title");
    const paragraphs = section.querySelectorAll(".our-story__content p");

    if (!section || !logo || !title || !paragraphs.length) return;

    const breakpoint = getCurrentBreakpoint();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: breakpoint === "mobile" ? "top 75%" : "20% 85%",
            end: "center center",
            toggleActions: "play none none reverse",
            scrub: 1,
            markers: false
        }
    });

    // Adjust for motion preferences
    const motion = {
        logoY: prefersReducedMotion ? 0 : -30,
        titleY: prefersReducedMotion ? 0 : 30,
        ease: prefersReducedMotion ? "power1.out" : "power2.out",
        duration: prefersReducedMotion ? 0.4 : 0.6,
        paraX: prefersReducedMotion ? 0 : 50,
        paraDuration: prefersReducedMotion ? 0.4 : 0.8
    };

    tl.from(logo, {
        y: motion.logoY,
        autoAlpha: 0,
        duration: motion.duration,
        ease: motion.ease
    });

    tl.from(title, {
        y: motion.titleY,
        autoAlpha: 0,
        duration: motion.duration,
        ease: motion.ease
    }, "-=0.3");

    paragraphs.forEach((p, i) => {
        tl.from(p, {
            x: i % 2 === 0 ? -motion.paraX : motion.paraX,
            autoAlpha: 0,
            duration: motion.paraDuration,
            ease: motion.ease
        }, "-=0.4");
    });
}
