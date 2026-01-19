import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function animateQuote() {
    const section = document.querySelector("#quote");

    if (!section) return;

    const quoteText = section?.querySelector(".quote__content__text");

    if (!quoteText) return;

    if (prefersReducedMotion()) return;

    const split = new SplitText(quoteText, { type: "chars, words", charsClass: "quote-char", mask: "chars" });

    // Start all chars invisible
    gsap.set(split.chars, {
        autoAlpha: 0,
        yPercent: () => (Math.random() < 0.5 ? -100 : 100)
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
        duration: 0.6,
        ease: "power2.out",
        stagger:
        {
            each: 0.02,
            from: "random"
        }
    });
}
