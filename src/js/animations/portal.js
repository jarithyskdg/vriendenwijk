import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function animatePortal() {
    const section = document.querySelector("#portal");

    if (!section) return;

    const title = section?.querySelector(".portal__title h2");
    const button = section?.querySelector(".portal__cta .button");

    if (!title || !button) return;

    if (prefersReducedMotion()) return;

    // Split the title into characters
    const split = new SplitText(title, {
        type: "chars, words",
        charsClass: "portal-char"
    });

    // Start all characters hidden and below
    gsap.set(split.chars, {
        autoAlpha: 0,
        yPercent: 100
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
        duration: 0.5,
        ease: "power2.out",
        stagger:
        {
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
        scale: 0.90,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out"
    });
}
