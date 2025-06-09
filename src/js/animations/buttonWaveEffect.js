import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function initButtonWaveEffect() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.fonts.ready.then(() => {
        const buttons = document.querySelectorAll(".button");

        buttons.forEach((button) => {
            const split = new SplitText(button, {
                type: "chars, words, lines",
                charsClass: "button-char"
            });

            // Ensure initial state
            gsap.set(split.chars, {
                display: "inline-block",
                yPercent: 0
            });

            if (prefersReducedMotion) {
                // Reduced motion: no slide, just toggle bold class instantly
                const animateIn = () => {
                    split.chars.forEach((char) => {
                        char.classList.add("button-char--bold");
                    });
                };

                const animateOut = () => {
                    split.chars.forEach((char) => {
                        char.classList.remove("button-char--bold");
                    });
                };

                button.addEventListener("mouseenter", animateIn);
                button.addEventListener("mouseleave", animateOut);
                button.addEventListener("focus", animateIn);
                button.addEventListener("blur", animateOut);

            } else {
                // Original wave animation
                const animateIn = () => {
                    split.chars.forEach((char, i) => {
                        const delay = i * 0.03;
                        gsap.killTweensOf(char);

                        gsap.to(char, {
                            yPercent: -100,
                            duration: 0.3,
                            ease: "back.in",
                            delay,
                            onComplete: () => {
                                gsap.set(char, { yPercent: 100 });
                                char.classList.add("button-char--bold");

                                gsap.to(char, {
                                    yPercent: 0,
                                    duration: 0.3,
                                    ease: "back.out"
                                });
                            }
                        });
                    });
                };

                const animateOut = () => {
                    [...split.chars].reverse().forEach((char, i) => {
                        const delay = i * 0.03;
                        gsap.killTweensOf(char);

                        gsap.to(char, {
                            yPercent: 100,
                            duration: 0.3,
                            ease: "back.in",
                            delay,
                            onComplete: () => {
                                gsap.set(char, { yPercent: -100 });
                                char.classList.remove("button-char--bold");

                                gsap.to(char, {
                                    yPercent: 0,
                                    duration: 0.3,
                                    ease: "back.out"
                                });
                            }
                        });
                    });
                };

                button.addEventListener("mouseenter", animateIn);
                button.addEventListener("mouseleave", animateOut);
                button.addEventListener("focus", animateIn);
                button.addEventListener("blur", animateOut);
            }
        });
    });
}
