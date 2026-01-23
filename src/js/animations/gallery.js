import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger, Flip);

let flipCtx;

export function initGalleryFlip() {
    const galleryElement = document.querySelector("#gallery-8");
    if (!galleryElement) return;

    const galleryItems = galleryElement.querySelectorAll(".gallery__item");

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
                    trigger: galleryElement,
                    start: "center center",
                    end: "+=100%",
                    scrub: true,
                    pin: galleryElement.parentNode
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
