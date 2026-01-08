import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";

gsap.registerPlugin(ScrollTrigger);

export function animateFacilities() {
    const section = document.querySelector("#faciliteiten");
    const img = section.querySelector(".faciliteiten__img img");
    const title = section.querySelector(".faciliteiten__content__title");
    const firstParagraph = section.querySelectorAll(".faciliteiten__content__text--first");
    const lastParagraph = section.querySelectorAll(".faciliteiten__content__text--last");
    const listItems = section.querySelectorAll(".faciliteiten__list__item");
    const cta = section.querySelector(".faciliteiten__content__cta");

    if (!section || !img || !title || !firstParagraph.length || !lastParagraph.length || !listItems.length || !cta) return;

    const breakpoint = getCurrentBreakpoint();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: breakpoint === "mobile" ? "top 75%" : "20% 85%",
            end: breakpoint === "mobile" ? "center 40%" : "center center",
            toggleActions: "play none none reverse",
            scrub: 1,
            markers: false
        }
    });

    tl.from(img, {
        x: prefersReducedMotion ? 0 : -100,
        opacity: 0,
        duration: prefersReducedMotion ? 0.6 : 1,
        ease: "power3.out"
    });

    tl.from(title, {
        y: prefersReducedMotion ? 0 : 50,
        opacity: 0,
        duration: prefersReducedMotion ? 0.5 : 0.8,
        ease: "power3.out"
    }, prefersReducedMotion ? "=" : "-=0.6");

    tl.from(firstParagraph, {
        y: prefersReducedMotion ? 0 : 30,
        opacity: 0,
        duration: prefersReducedMotion ? 0.4 : 0.6,
        ease: prefersReducedMotion ? "power1.out" : "power2.out",
        stagger: 0.2
    }, prefersReducedMotion ? "=" : "-=0.5");

    tl.from(listItems, {
        x: prefersReducedMotion ? 0 : 50,
        opacity: 0,
        duration: prefersReducedMotion ? 0.4 : 0.5,
        ease: prefersReducedMotion ? "power1.out" : "power2.out",
        stagger: prefersReducedMotion ? 0 : 0.15
    }, prefersReducedMotion ? "=" : "-=0.4");

    tl.from(lastParagraph, {
        y: prefersReducedMotion ? 0 : 30,
        opacity: 0,
        duration: prefersReducedMotion ? 0.4 : 0.6,
        ease: prefersReducedMotion ? "power1.out" : "power2.out",
        stagger: 0.2
    }, prefersReducedMotion ? "=" : "-=0.5");

    tl.from(cta, {
        scale: prefersReducedMotion ? 1 : 0.9,
        opacity: 0,
        duration: prefersReducedMotion ? 0.4 : 0.6,
        ease: prefersReducedMotion ? "power1.out" : "back.out(1.7)"
    }, prefersReducedMotion ? "=" : "-=0.4");
}
