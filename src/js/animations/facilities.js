import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function animateFacilities() {
    const section = document.querySelector("#faciliteiten");
    const gallery = document.querySelector("#gallery");

    if (!section) return;

    // const slider = section.querySelector(".faciliteiten__slider .slider");
    const content = section.querySelector(".faciliteiten__content");

    if (!content) return;

    const title = section.querySelector(".faciliteiten__content__title");
    const firstParagraph = section.querySelectorAll(".faciliteiten__content__text--first");
    const lastParagraph = section.querySelectorAll(".faciliteiten__content__text--last");
    const listItems = section.querySelectorAll(".faciliteiten__list__item");
    const cta = section.querySelector(".faciliteiten__content__cta");

    if (!title || !firstParagraph.length || !lastParagraph.length || !listItems.length || !cta) return;

    if (prefersReducedMotion()) return;

    const breakpoint = getCurrentBreakpoint();

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: gallery,
            start: breakpoint === "mobile" ? "top 75%" : "20% 85%",
            end: breakpoint === "mobile" ? "center 40%" : "center center",
            toggleActions: "play none none reverse",
            // scrub: 1,
            markers: false
        }
    });

    tl.from(title, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });

    tl.from(firstParagraph, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.5");

    tl.from(listItems, {
        x: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.15
    }, "-=0.4");

    tl.from(lastParagraph, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.4");

    tl.from(cta, {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
    }, "-=0.4");
}
