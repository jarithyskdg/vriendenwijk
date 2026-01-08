import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export function animateHome() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = document.querySelector(".home"); // Assuming .home is the container for this section
    if (!section) return;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            toggleActions: "play reverse restart reverse",
            scrub: false,
            markers: false // Set true if you want to debug
        }
    });

    if (prefersReducedMotion) {
        tl.from(".home__logo", {
            // y: -100,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power1.out"
        });

        tl.from(".home__subtitle", {
            // y: -100,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power1.out"
        }, "-=0.3");

        tl.from(".scroll-arrow", {
            // y: -50,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power1.out"
        }, "-=0.3");

    } else {
        tl.from(".home__logo", {
            y: -265,
            duration: 0.7,
            ease: "power1.out"
        });

        document.fonts.ready.then(() => {
            const split = SplitText.create(".home__subtitle", {
                type: "words"
            });

            tl.from(split.words, {
                y: -100,
                rotation: "random(-80, 80)",
                duration: 0.7,
                ease: "back",
                stagger: 0.15,
                autoAlpha: 0
            });

            tl.from(".scroll-arrow", {
                y: -50,
                autoAlpha: 0,
                duration: 0.7,
                ease: "power1.out"
            }, "-=0.4");
        });
    }
}
