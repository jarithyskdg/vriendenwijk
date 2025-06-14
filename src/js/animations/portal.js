import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function animatePortal() {
    const section = document.querySelector("#portal");
    const title = section?.querySelector(".portal__content__title h2");
    const button = section?.querySelector(".portal__cta .button");

    if (!section || !title || !button) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Split the title into characters
    const split = new SplitText(title, {
        type: "chars, words",
        charsClass: "portal-char"
    });

    // Start all characters hidden and below
    gsap.set(split.chars, {
        autoAlpha: 0,
        yPercent: prefersReducedMotion ? 0 : 100
    });

    // Animate characters on scroll
    gsap.to(split.chars, {
        scrollTrigger: {
            trigger: title,
            start: "top 90%",
            toggleActions: "play none resume reverse",
            markers: false
        },
        autoAlpha: 1,
        yPercent: 0,
        duration: prefersReducedMotion ? 0.3 : 0.5,
        ease: "power2.out",
        stagger: prefersReducedMotion ? 0 : {
            each: 0.05,
            from: "random"
        }
    });

    // Animate the button after the characters
    gsap.from(button, {
        scrollTrigger: {
            trigger: button,
            start: "top 90%",
            toggleActions: "play none resume reverse",
            markers: false
        },
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 0.90,
        duration: prefersReducedMotion ? 0.3 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.2,
        ease: "power2.out"
    });
}
