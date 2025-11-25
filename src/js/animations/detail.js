import { gsap } from "gsap";
import SplitText from "gsap/SplitText";


export function animateDetail() {
    const tl = gsap.timeline({
        defaults: { ease: "power1.out" }
    });

    // Split title for a small wave effect (your style)
    const title = new SplitText(".detail__content__title", {
        types: "words, chars"
    });

    // Initial animation

    // Image fades & scales slightly
    tl.from(".detail__img", {
        scale: 1.05,
        autoAlpha: 0,
        duration: 0.6
    })

    // Title characters
    .from(title.chars, {
        y: 20,
        autoAlpha: 0,
        duration: 0.4,
        stagger: 0.02,
        ease: "back.out(2.5)"
    }, "-=0.2")

    // Buttons below title
    .from(".button--detail-content", {
        y: 15,
        autoAlpha: 0,
        duration: 0.4,
        stagger: 0.2
    }, "-=0.2")

    // First visible content section
    .from(".detail__content__body__section:not(.hidden) > *", {
        y: -20,
        autoAlpha: 0,
        duration: 0.35,
    }, "-=0.2");
}
