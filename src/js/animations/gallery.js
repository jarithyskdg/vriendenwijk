import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(ScrollTrigger, Flip);

let flipCtx;

export function initGalleryFlip() {
    const galleryElement = document.querySelector("#gallery");
    if (!galleryElement) return;

    const galleryItems = galleryElement.querySelectorAll(".gallery__item");
    const facilitiesContent = document.querySelector("#faciliteiten .faciliteiten__content");

    // If reduced motion is enabled, ensure a clean static state (no pin, no transforms)
    if (prefersReducedMotion()) {
        flipCtx && flipCtx.revert();

        const existing = ScrollTrigger.getById("faciliteiten-gallery-flip");
        if (existing) existing.kill(true);

        galleryElement.classList.remove("gallery--final");
        gsap.set(galleryItems, { clearProps: "all" });

        // override the CSS-hidden overlay and show it
        if (facilitiesContent) {
            gsap.set(facilitiesContent, {
                clearProps: "all",      // remove any inline gsap stuff first
                opacity: 1,
                autoAlpha: 1,
                y: 0,
                pointerEvents: "auto"
            });
        }

        return;
    }

    const createTween = () => {
        flipCtx && flipCtx.revert();
        galleryElement.classList.remove("gallery--final");

        flipCtx = gsap.context(() => {
            galleryElement.classList.add("gallery--final");
            const flipState = Flip.getState(galleryItems);
            galleryElement.classList.remove("gallery--final");

            const flip = Flip.to(flipState, {
                simple: true,
                ease: "expoScale(1, 5)"
            });

            // prep overlay (hidden)
            if (facilitiesContent) {
                gsap.set(facilitiesContent, {
                    autoAlpha: 0,
                    y: 16,
                    pointerEvents: "none"
                });
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    id: "faciliteiten-gallery-flip",
                    trigger: galleryElement,
                    start: "center center",
                    end: "+=150%",
                    scrub: true,
                    pin: galleryElement.parentNode,
                    pinSpacing: true,
                    // markers: true
                }
            });

            tl.add(flip);

            // reveal after the flip is finished
            if (facilitiesContent) {
                tl.to(facilitiesContent, {
                    autoAlpha: 1,
                    y: 0,
                    pointerEvents: "auto",
                    duration: 0.15
                }, ">=-0.50");
            }

            return () => {
                gsap.set(galleryItems, { clearProps: "all" });
                if (facilitiesContent) gsap.set(facilitiesContent, { clearProps: "all" });
            };
        });
    };

    createTween();
    window.addEventListener("resize", createTween);
}