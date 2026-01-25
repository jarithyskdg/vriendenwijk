import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { prefersReducedMotion } from "../helpers/reducedMotion";
import { getCurrentBreakpoint } from "../helpers/breakpoints";

gsap.registerPlugin(SplitText);

export function animateDetail() {
    if (prefersReducedMotion()) return;

    const titleEl = document.querySelector(".detail__content__title");
    if (!titleEl) return;

    // Prevent double-splitting if something re-inits
    if (titleEl.querySelector(".char")) return;

    const breakpoint = getCurrentBreakpoint();
    const isMobileOrTablet = breakpoint === "mobile" || breakpoint === "tablet";

    const tl = gsap.timeline({
        defaults: { ease: "power1.out" }
    });

    const title = new SplitText(titleEl, {
        type: "words, chars"
    });

    // Slider intro:
    // - Mobile/Tablet: animate the whole slider container once
    // - Desktop: stagger each slider item
    if (isMobileOrTablet) {
        tl.from(".detail__slider", {
            scale: 1.02,
            autoAlpha: 0,
            duration: 0.6
        });
    } else {
        tl.from(".slider__item", {
            scale: 1.05,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.15
        });
    }

    // Title characters
    tl.from(title.chars, {
        y: 20,
        autoAlpha: 0,
        duration: 0.4,
        stagger: 0.02,
        ease: "back.out(2.5)"
    }, "-=0.35");

    // Buttons below title
    tl.from(".button--detail-content", {
        y: 15,
        autoAlpha: 0,
        duration: 0.4,
        stagger: 0.12
    }, "-=0.25");

    // First visible content section
    tl.from(".detail__content__body__section:not(.hidden) > *", {
        y: -20,
        autoAlpha: 0,
        duration: 0.35
    }, "-=0.2");
}