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

    // Animate logo and title
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: breakpoint === "mobile" ? "top 75%" : "20% 85%",
            end: "center center",
            toggleActions: "play none none reverse",
            scrub: 1,
            markers: false // set to true for debugging
        }
    });

    tl.from(logo, {
        y: -30,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.out"
    });

    tl.from(title, {
        y: 30,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.3");

    paragraphs.forEach((p, i) => {
        tl.from(p, {
            x: i % 2 === 0 ? -50 : 50,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4");
    });
}
