import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";

gsap.registerPlugin(ScrollTrigger);

export function animateAboutUs() {
    const section = document.querySelector("#about-us");
    const items = document.querySelectorAll(".about-us__item");
    const cta = document.querySelector(".about-us__cta");

    if (!section || !items.length || !cta) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const breakpoint = getCurrentBreakpoint();

    const scrollTriggerSettings = {
        trigger: section,
        start: breakpoint === "mobile" ? "top 75%" : "25% 85%",
        end: breakpoint === "mobile" ? "center 40%" : "center center",
        toggleActions: "play none none reverse",
        scrub: 1,
        markers: false
    };

    gsap.set(items, {
        backgroundColor: "rgba(255, 255, 255, 0)",
        boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0)"
    });

    const tl = gsap.timeline({
        scrollTrigger: scrollTriggerSettings
    });

    const itemArray = Array.from(items);
    if (breakpoint === "desktop" && !prefersReducedMotion) {
        gsap.utils.shuffle(itemArray);
    }

    itemArray.forEach((item, index) => {
        const icon = item.querySelector(".about-us__item__icon");
        const title = item.querySelector(".about-us__item__title");
        const text = item.querySelector(".about-us__item__text");

        const itemTL = gsap.timeline();

        // Set motion-sensitive easing and durations
        const iconEase = prefersReducedMotion ? "power1.out" : (breakpoint === "desktop" ? "bounce.out" : "power3.out");
        const iconY = prefersReducedMotion ? "0" : breakpoint === "mobile" ? -50 : -80;
        const iconDuration = prefersReducedMotion ? 0.4 : (breakpoint === "mobile" ? 0.6 : 0.8);

        const titleEase = prefersReducedMotion ? "power1.out" : "back.out(1.7)";
        const titleDuration = prefersReducedMotion ? 0.4 : 0.6;

        const textEase = prefersReducedMotion ? "power1.out" : "power2.out";
        const textDuration = prefersReducedMotion ? 0.4 : 0.6;

        itemTL.to(item, {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.25)",
            duration: prefersReducedMotion ? 0.4 : 0.6,
            ease: "power1.out"
        });

        itemTL.from(icon, {
            y: iconY,
            autoAlpha: 0,
            duration: iconDuration,
            ease: iconEase
        }, "-=0.4");

        itemTL.from(title, {
            scale: 0,
            autoAlpha: 0,
            duration: titleDuration,
            ease: titleEase
        }, "-=0.4");

        itemTL.from(text, {
            y: 30,
            autoAlpha: 0,
            duration: textDuration,
            ease: textEase
        }, "-=0.3");

        prefersReducedMotion ? tl.add(itemTL, 0) : tl.add(itemTL, index * 0.4);
    });

    tl.from(cta, {
        y: prefersReducedMotion ? 30 : 80,
        autoAlpha: 0,
        duration: prefersReducedMotion ? 0.5 : 0.8,
        ease: prefersReducedMotion ? "power1.out" : "power3.out"
    }, "-=0.3");
}
