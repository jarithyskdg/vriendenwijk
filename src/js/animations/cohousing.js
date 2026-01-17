import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";

gsap.registerPlugin(SplitText, ScrollTrigger);

export function animateCohousing() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.fonts.ready.then(() => {
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
                start: breakpoint === "mobile" ? "top 75%" : "20% 85%",
                end: "center center",
                toggleActions: "play none none reverse",
                scrub: 1,
                markers: false
            }
        });

        if (prefersReducedMotion) {
            // Reduced motion-friendly animations
            tl.from(splitTitle.words, {
                y: 30,            // smaller vertical movement
                rotation: 0,      // no rotation
                autoAlpha: 0,
                duration: 1,
                ease: "power1.out",
                stagger: 0.1
            });

            tl.from(splitText.lines, {
                y: 15,            // smaller vertical movement
                autoAlpha: 0,
                duration: 1,
                ease: "power1.out",
                stagger: 0.15
            }, "+=0.2");

            tl.from(cta, {
                scale: 0.95,      // subtle scaling
                autoAlpha: 0,
                duration: 1,
                ease: "power1.out",
            }, "-=0.2");
        } else {
            // Original, more dynamic animations
            tl.from(splitTitle.words, {
                y: 50,
                rotation: "random(-80, 80)",
                autoAlpha: 0,
                duration: 2,
                ease: "power3.out",
                stagger: 0.1
            });

            tl.from(splitText.lines, {
                y: 100,
                autoAlpha: 0,
                duration: 3,
                ease: "power3.out",
                stagger: 1
            }, "+=0.3");

            tl.from(cta, {
                scale: 0.8,
                autoAlpha: 0,
                duration: 2,
                ease: "power3.out",
            }, "-=0.3");
        }
    });
}
