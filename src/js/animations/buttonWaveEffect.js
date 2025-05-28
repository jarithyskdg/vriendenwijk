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

            button.addEventListener("mouseenter", () => {
                split.chars.forEach((char, i) => {
                    const delay = i * 0.03;

                    // 💡 Kill any existing tweens before applying new ones
                    gsap.killTweensOf(char);

                    // Animate out (up)
                    gsap.to(char, {
                        yPercent: -100,
                        duration: 0.3,
                        ease: "back.in",
                        delay,
                        onComplete: () => {
                            // Jump to below and bold
                            gsap.set(char, {
                                yPercent: 100
                            });
                            char.classList.add("button-char--bold");

                            // Animate in (up from below)
                            gsap.to(char, {
                                yPercent: 0,
                                duration: 0.3,
                                ease: "back.out"
                            });
                        }
                    });
                });
            });

            button.addEventListener("mouseleave", () => {
                [...split.chars].reverse().forEach((char, i) => {
                    const delay = i * 0.03;

                    // 💡 Kill any existing tweens before applying new ones
                    gsap.killTweensOf(char);

                    // Animate out (down)
                    gsap.to(char, {
                        yPercent: 100,
                        duration: 0.3,
                        ease: "back.in",
                        delay,
                        onComplete: () => {
                            // Jump to above and remove bold
                            gsap.set(char, {
                                yPercent: -100
                            });
                            char.classList.remove("button-char--bold");

                            // Animate back in from top
                            gsap.to(char, {
                                yPercent: 0,
                                duration: 0.3,
                                ease: "back.out"
                            });
                        }
                    });
                });
            });
        });
    });
}
