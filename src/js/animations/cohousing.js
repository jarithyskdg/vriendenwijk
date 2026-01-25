import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(SplitText, ScrollTrigger);

export async function animateCohousing() {
    // Exit early if motion should be reduced
    if (prefersReducedMotion()) return;

    const section = document.querySelector("#cohousing");
    const title = document.querySelector(".cohousing__content__title");
    const text = document.querySelector(".cohousing__content__text");
    const cta = document.querySelector(".cohousing__cta");

    if (!section || !title || !text || !cta) return;

    const breakpoint = getCurrentBreakpoint();

    // Split title into words, text into lines
    const splitTitle = new SplitText(title, { type: "words", wordsClass: "cohousing-word" });
    const splitText = new SplitText(text, { type: "lines", linesClass: "cohousing-line", mask: "lines" });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: breakpoint === "mobile" ? "top 75%" : "top center",
            end: "center center",
            toggleActions: "play none none reverse",
            // scrub: 1,
            markers: true
        }
    });

    tl.from(splitTitle.words, {
        y: 50,
        rotation: "random(-80, 80)",
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1
    });

    tl.from(splitText.lines, {
        y: 100,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15
    }, "-=0.3");

    tl.from(cta, {
        scale: 0.8,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
    }, "-=0.3");
}
