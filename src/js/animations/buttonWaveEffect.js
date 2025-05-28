import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function initButtonWaveEffect() {
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

            // Abstract animation logic for reuse
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

            // Mouse events
            button.addEventListener("mouseenter", animateIn);
            button.addEventListener("mouseleave", animateOut);

            // Keyboard accessibility events
            button.addEventListener("focus", animateIn);
            button.addEventListener("blur", animateOut);
        });
    });
}
