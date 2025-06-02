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

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: breakpoint === "mobile" ? "top 75%" : "20% 85%",
            end: "center center",
            toggleActions: "play none none reverse",
            scrub: 1,
            markers: true // set to true for debugging
        }
    });

    tl.from(img, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    tl.from(title, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6");

    tl.from(firstParagraph, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2
    }, "-=0.5");

    tl.from(listItems, {
        x: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.15
    }, "-=0.4");

    tl.from(lastParagraph, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2
    }, "-=0.5");

    tl.from(cta, {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
    }, "-=0.4");
}
