import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export function animateCohousing() {
    document.fonts.ready.then(() => {
        const title = document.querySelector(".cohousing__content__title");

        if (!title) return;

        // Setup SplitText but defer animation until ScrollTrigger fires
        const split = new SplitText(title, {
            type: "words"
        });

        // Create animation timeline tied to ScrollTrigger
        gsap.from(split.words, {
            y: -100,
            rotation: "random(-80, 80)",
            duration: 1,
            ease: "power4.inOut",
            stagger: 0.25,
            autoAlpha: 0,
            scrollTrigger: {
                trigger: title,
                start: "top 100%", // when element hits 80% from top of viewport
                end: "bottom 20%", // when element hits 20% from bottom of viewport
                scrub: true, // smooth scrubbing
                // scrub: 3, // 1 second of scrubbing
            }
        });
    });
}
