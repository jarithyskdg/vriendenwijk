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
        const splitTitle = new SplitText(title, { type: "words", wordsClass: "cohousing-word" });
        const splitText = new SplitText(text, { type: "lines", linesClass: "cohousing-line" });

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

export function animateCohousingArms() {
    const breakpoint = getCurrentBreakpoint();
    if (breakpoint !== "desktop") return; // Only run on desktop

    const section = document.querySelector("#cohousing");
    const armsContainer = document.querySelector(".cohousing__arms");
    if (!section || !armsContainer) return;

    const arms = {
        left: armsContainer.querySelector(".arm--left"),
        right: armsContainer.querySelector(".arm--right"),
        top: armsContainer.querySelector(".arm--top"),
        bottom: armsContainer.querySelector(".arm--bottom"),
        bottomRight: armsContainer.querySelector(".arm--bottom-right"),
    };

    if (!Object.values(arms).every(Boolean)) return;

    const leftWidth = arms.left.getBoundingClientRect().width;
    const rightWidth = arms.right.getBoundingClientRect().width;
    const topHeight = arms.top.getBoundingClientRect().height;
    const bottomHeight = arms.bottom.getBoundingClientRect().width;
    const bottomRightHeight = arms.bottomRight.getBoundingClientRect().height;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom 85%",
            toggleActions: "play reverse restart reverse",
            markers: false,
        },
    });

    tl.fromTo(arms.top,
        { y: 0, x: -45, rotation: 45, autoAlpha: 0 },
        { y: topHeight, x: 0, rotation: 0, duration: 1, autoAlpha: 1, ease: "power2.out" }
    );

    tl.fromTo(arms.bottomRight,
        { y: 0, x: -90, rotation: -90, autoAlpha: 0 },
        { y: -bottomRightHeight, x: 0, rotation: 0, duration: 1, autoAlpha: 1, ease: "power2.out" },
        "-=0.75"
    );

    tl.fromTo(arms.right,
        { x: 100, rotation: 35, autoAlpha: 0 },
        { x: -rightWidth, rotation: 0, duration: 1, autoAlpha: 1, ease: "power2.out" },
        "-=0.75"
    );

    tl.fromTo(arms.left,
        { x: -100, y: 100, rotation: 30, autoAlpha: 0 },
        { x: leftWidth - 10, y: 0, rotation: 10, duration: 1, autoAlpha: 1, ease: "power2.out" },
        "-=0.75"
    );

    tl.fromTo(arms.bottom,
        { y: 0, rotation: 90, autoAlpha: 0 },
        { y: -bottomHeight, rotation: 90, duration: 1, autoAlpha: 1, ease: "power2.out" },
        "-=0.75"
    );
}