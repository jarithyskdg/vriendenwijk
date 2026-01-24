import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(ScrollTrigger, Flip);

let flipCtx;

export function initGalleryFlip() {
    const galleryElement = document.querySelector("#gallery-8");
    if (!galleryElement) return;

    const galleryItems = galleryElement.querySelectorAll(".gallery__item");

    // If reduced motion is enabled, ensure a clean static state (no pin, no transforms)
    if (prefersReducedMotion()) {
        // revert any existing context/tweens
        flipCtx && flipCtx.revert();

        // kill the existing ScrollTrigger if it exists (in case of re-init)
        const existing = ScrollTrigger.getById("faciliteiten-gallery-flip");
        if (existing) existing.kill(true);

        galleryElement.classList.remove("gallery--final");
        gsap.set(galleryItems, { clearProps: "all" });

        return;
    }

    const createTween = () => {
        // Clean up previous context
        flipCtx && flipCtx.revert();
        galleryElement.classList.remove("gallery--final");

        flipCtx = gsap.context(() => {
            // Temporarily apply final state to capture FLIP
            galleryElement.classList.add("gallery--final");
            const flipState = Flip.getState(galleryItems);
            galleryElement.classList.remove("gallery--final");

            const flip = Flip.to(flipState, {
                simple: true,
                ease: "expoScale(1, 5)"
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    id: "faciliteiten-gallery-flip",
                    trigger: galleryElement,
                    start: "center center",
                    end: "+=100%",
                    scrub: true,
                    pin: galleryElement.parentNode,
                    pinSpacing: true,
                    // markers: true
                }
            });

            tl.add(flip);

            // cleanup on revert
            return () => {
                gsap.set(galleryItems, { clearProps: "all" });
            };
        });
    };

    createTween();
    window.addEventListener("resize", createTween);
}