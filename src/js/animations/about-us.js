import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";

gsap.registerPlugin(ScrollTrigger);

export function animateAboutUs() {
    const section = document.querySelector("#about-us");
    const items = document.querySelectorAll(".about-us__item");
    const cta = document.querySelector(".about-us__cta");

    if (!section || !items.length || !cta) return;

    const breakpoint = getCurrentBreakpoint();

    const scrollTriggerSettings = {
        trigger: section,
        start: breakpoint === "mobile" ? "top 75%" : "25% 85%",
        end: breakpoint === "mobile" ? "center 40%" : "center center",
        toggleActions: "play none none reverse",
        scrub: 1,
        markers: false // set to true for debugging
    };

    const tl = gsap.timeline({
        scrollTrigger: scrollTriggerSettings
    });

    // Convert NodeList to array and optionally shuffle for desktop
    const itemArray = Array.from(items);
    if (breakpoint === "desktop") {
        gsap.utils.shuffle(itemArray);
    }

    itemArray.forEach((item, index) => {
        const icon = item.querySelector(".about-us__item__icon");
        const title = item.querySelector(".about-us__item__title");
        const text = item.querySelector(".about-us__item__text");

        const itemTL = gsap.timeline();

        const iconEase = breakpoint === "desktop" ? "bounce.out" : "power3.out";

        itemTL.from(icon, {
            // y: -80,
            y: breakpoint === "mobile" ? -50 : -80,
            autoAlpha: 0,
            // duration: 0.8,
            duration: breakpoint === "mobile" ? 0.6 : 0.8,
            ease: iconEase
        });

        itemTL.from(title, {
            scale: 0,
            autoAlpha: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, "-=0.4");

        itemTL.from(text, {
            y: 30,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.3");

        tl.add(itemTL, index * 0.4);
    });

    tl.from(cta, {
        y: 80,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.3");
}
