import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function animateAboutUs() {
    const section = document.querySelector("#about-us");
    if (!section) return;

    const items = Array.from(section.querySelectorAll(".about-us__item"));
    const cta = section.querySelector(".about-us__cta");

    if (!items.length || !cta) return;
    if (prefersReducedMotion()) return;

    const breakpoint = getCurrentBreakpoint();

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: breakpoint === "mobile" ? "top 75%" : "25% 85%",
            end: breakpoint === "mobile" ? "center 40%" : "center center",
            toggleActions: "play none none reverse",
            markers: false
        }
    });

    // if (breakpoint === "desktop") gsap.utils.shuffle(items);

    
    tl.from(items, {
        autoAlpha: 0,
        y: 24,
        scale: 0.85,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.2,
        clearProps: "transform"
    });

    const icons = items.map(i => i.querySelector(".about-us__item__icon")).filter(Boolean);
    const titles = items.map(i => i.querySelector(".about-us__item__title")).filter(Boolean);
    const texts = items.map(i => i.querySelector(".about-us__item__text")).filter(Boolean);

    tl.from(icons, {
        y: breakpoint === "mobile" ? -16 : -22,
        autoAlpha: 0,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.12
    }, "-=0.35");

    tl.from(titles, {
        y: 10,
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.12
    }, "-=0.30");

    tl.from(texts, {
        y: 10,
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.12
    }, "-=0.55");

    tl.from(cta, {
        y: 24,
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.out"
    }, "-=0.15");
}