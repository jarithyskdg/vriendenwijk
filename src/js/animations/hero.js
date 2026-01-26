import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(SplitText, ScrollTrigger);

export function animateHero() {
    const section = document.querySelector("#hero");
    if (!section) return;

    if (prefersReducedMotion()) return;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            toggleActions: "play reverse restart reverse",
            scrub: false,
            markers: false
        }
    });

    tl.from(".hero__logo", {
        y: -265,
        duration: 0.7,
        ease: "power1.out"
    });

    document.fonts.ready.then(() => {
        const split = SplitText.create(".hero__subtitle", {
            type: "words",
            wordsClass: "hero-subtitle-word"
        });

        tl.from(split.words, {
            y: -100,
            rotation: "random(-80, 80)",
            duration: 0.7,
            ease: "back",
            stagger: 0.15,
            autoAlpha: 0
        });

        tl.from(".hero__scroll-arrow", {
            y: -50,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power1.out"
        }, "-=0.4");
    });
}