import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function animateHome() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tl = gsap.timeline();

    if (prefersReducedMotion) {
        // Simplified animations: fade in + slide down
        tl.from(".home__logo", {
            y: -100,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power1.out"
        });

        tl.from(".home__subtitle", {
            y: -100,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power1.out"
        }, "-=0.3");

        tl.from(".scroll-arrow", {
            y: -50,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power1.out"
        }, "-=0.3");

    } else {
        // Full motion animation
        tl.from(".home__logo", {
            y: -165,
            duration: 0.7,
            ease: "power1.out"
        });

        document.fonts.ready.then(() => {
            const split = SplitText.create(".home__subtitle", {
                type: "words",
                onSplit: (self) => {
                    // Animate subtitle
                    tl.from(self.words, {
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
                }
            });
        });
    }
}
