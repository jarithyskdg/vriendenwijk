import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function animateOurStory() {
    const section = document.querySelector("#our-story");

    if (!section) return;

    const logo = section.querySelector(".logo--small");
    const title = section.querySelector(".our-story__title");
    const paragraphs = section.querySelectorAll(".our-story__content p");

    if (!logo || !title || !paragraphs.length) return;

    if (prefersReducedMotion()) return;

    const breakpoint = getCurrentBreakpoint();

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: breakpoint === "mobile" ? "top 75%" : "20% 85%",
            end: "center center",
            toggleActions: "play none none reverse",
            // scrub: 1,
            markers: false
        }
    });

    tl.from(logo, {
        y: -50,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.out"
    });

    tl.from(title, {
        y: -50,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.35");

    paragraphs.forEach((p, i) => {
        tl.from(p, {
            x: i % 2 === 0 ? -100 : 100,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.4");
    });
}
