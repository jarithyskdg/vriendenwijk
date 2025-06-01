import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";

gsap.registerPlugin(SplitText, ScrollTrigger);

export function animateCohousing() {
    document.fonts.ready.then(() => {
        const section = document.querySelector("#cohousing");
        const title = document.querySelector(".cohousing__content__title");
        const text = document.querySelector(".cohousing__content__text");
        const cta = document.querySelector(".cohousing__cta");

        if (!section || !title || !text || !cta) return;

        const breakpoint = getCurrentBreakpoint();

        // Split title into words, text into lines
        const splitTitle = new SplitText(title, { type: "words" });
        const splitText = new SplitText(text, { type: "lines" });

        // Timeline with ScrollTrigger based on the whole section
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                // start: "top 85%",
                start: breakpoint === "mobile" ? "top 75%" : "20% 85%",
                end: "center center",
                toggleActions: "play none none reverse", // play on scroll in, reverse on scroll out (up only)
                scrub: 1, // smooth scrubbing
                markers: false // set to true for debugging
            }
        });

        // Animate title words
        tl.from(splitTitle.words, {
            y: 50,
            rotation: "random(-80, 80)",
            autoAlpha: 0,
            duration: 2,
            ease: "power3.out",
            stagger: 0.1
        });

        // Animate text lines after title
        tl.from(splitText.lines, {
            y: 40,
            autoAlpha: 0,
            duration: 2,
            ease: "power3.out",
            stagger: 0.2
        }, "+=0.3"); // slight delay after title finishes

        // Animate CTA button
        tl.from(cta, {
            scale: 0.8,
            autoAlpha: 0,
            duration: 2,
            ease: "power3.out",
        }, "-=0.3");
    });
}
