import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

let burgerTimeline;

export function initBurgerAnimation() {
    burgerTimeline = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    gsap.set("#theBurger", { autoAlpha: 1 });
    gsap.set(".buns", { drawSVG: "0% 30%" });
    gsap.set(".letters", { drawSVG: "53.5% 100%", x: -155 });

    burgerTimeline.to(".patty", { duration: 0.35, drawSVG: "50% 50%" }, 0);
    burgerTimeline.to(".patty", { duration: 0.1, opacity: 0, ease: "none" }, 0.25);
    burgerTimeline.to(".buns", { duration: 0.85, drawSVG: "69% 96.5%" }, 0);
    burgerTimeline.to(".letters", { duration: 0.85, drawSVG: "0% 53%", x: 0 }, 0);
    burgerTimeline.reversed(true);
}

export function toggleBurger() {
    if (burgerTimeline) {
        burgerTimeline.reversed(!burgerTimeline.reversed());
    }
}
