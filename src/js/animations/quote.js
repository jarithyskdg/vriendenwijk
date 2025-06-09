import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function animateQuote() {
    const section = document.querySelector("#quote");
    const quoteText = section?.querySelector(".quote__content__text");

    if (!section || !quoteText) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const split = new SplitText(quoteText, { type: "words", wordsClass: "quote-word" });

    // Start all words invisible
    gsap.set(split.words, {
        autoAlpha: 0,
        yPercent: prefersReducedMotion ? 0 : 100
    });

    // Animate on scroll
    gsap.to(split.words, {
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
                each: 0.05,
                from: "random"
            }
    });
}
