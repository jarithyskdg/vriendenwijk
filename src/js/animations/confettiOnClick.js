import { gsap } from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

gsap.registerPlugin(Physics2DPlugin);

export function initClickConfetti() {
    let isMobile = window.matchMedia("(pointer: coarse)").matches;
    let prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReducedMotion) {
        console.log("Confetti disabled: mobile or reduced motion preference.");
        return;
    }

    console.log("Confetti enabled for desktop.");

    document.addEventListener("click", (event) => {
        if (event.target.closest("a, button, input, textarea")) return; // Ignore clicks on interactive elements

        const dotCount = gsap.utils.random(15, 30, 1);
        const colors = ["#0ae448", "#abff84", "#fffce1"];

        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");

            document.body.appendChild(dot);

            gsap.set(dot, {
                backgroundColor: gsap.utils.random(colors),
                top: event.pageY,
                left: event.pageX,
                scale: 0,
            });

            gsap
                .timeline({
                    onComplete: () => dot.remove(),
                })
                .to(dot, {
                    scale: gsap.utils.random(0.3, 1),
                    duration: 0.3,
                    ease: "power3.out",
                })
                .to(
                    dot,
                    {
                        duration: 2,
                        physics2D: {
                            velocity: gsap.utils.random(250, 750),
                            angle: gsap.utils.random(0, 360),
                            gravity: 1500,
                        },
                        autoAlpha: 0,
                        ease: "none",
                    },
                    "<"
                );
        }
    });
}
