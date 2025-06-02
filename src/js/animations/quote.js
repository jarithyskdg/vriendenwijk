import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function animateQuote() {
    const section = document.querySelector("#quote");
    const quoteText = section?.querySelector(".quote__content__text");

    if (!section || !quoteText) return;

    // ✅ Split the paragraph into words
    const split = new SplitText(quoteText, { type: "words", wordsClass: "quote-word" });

    // Start all words invisible
    gsap.set(split.words, { autoAlpha: 0, yPercent: 100 });

    // Animate on scroll
    gsap.to(split.words, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            // end: "center center",
            toggleActions: "play pauze resume reset",
            markers: false // optional for debugging
        },
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: {
            each: 0.05,
            from: "random" // ← makes the words animate in random order
        }
    });
}
