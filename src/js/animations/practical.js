import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";

gsap.registerPlugin(ScrollTrigger);

export function animatePractical() {
    const section = document.querySelector("#practical");
    const img = section.querySelector(".practical__img img");
    const cards = section.querySelectorAll(".card--practical");

    if (!section || !img || !cards.length) return;

    const breakpoint = getCurrentBreakpoint();

    // Determine start and end values based on breakpoint
    let startValue;
    let endValue;

    if (breakpoint === "mobile") {
        startValue = "top 75%";
        endValue = "30% 40%";
    } else if (breakpoint === "tablet") {
        startValue = "top 75%";   // <-- Custom tablet start value
        endValue = "25% 40%";
    } else {
        startValue = "20% 85%";
        endValue = "center center";
    }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: startValue,
            end: endValue,
            toggleActions: "play none none reverse",
            scrub: 1,
            markers: false // set to true for debugging
        }
    });

    // Cards: alternate from left/right with bounce scale
    cards.forEach((card, index) => {
        const fromDirection = index % 2 === 0 ? -50 : 50;

        tl.from(card, {
            x: fromDirection,
            y: 50,
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, `-=${0.4 - index * 0.03}`);
    });

    // Image fade-in from the right
    tl.from(img, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
}
