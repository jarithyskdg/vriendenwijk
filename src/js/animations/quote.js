import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function animateQuote() {
    const section = document.querySelector("#quote");
    const quoteText = section?.querySelector(".quote__content__text");

    if (!section || !quoteText) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const split = new SplitText(quoteText, { type: "chars, words", charsClass: "quote-char", mask: "chars" });

    // Start all chars invisible
    gsap.set(split.chars, {
        autoAlpha: 0,
        yPercent: prefersReducedMotion ? 0 : () => (Math.random() < 0.5 ? -100 : 100)
    });

    // Animate on scroll
    gsap.to(split.chars, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play pause resume reset",
            markers: false
        },
        autoAlpha: 1,
        yPercent: 0,
        duration: prefersReducedMotion ? 0.3 : 0.6,
        ease: prefersReducedMotion ? "power1.out" : "power2.out",
        stagger: prefersReducedMotion
            ? 0 // no stagger for reduced motion
            : {
                each: 0.02,
                from: "random"
            }
    });
}
