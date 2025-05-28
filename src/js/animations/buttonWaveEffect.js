import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function initButtonWaveEffect() {
    const buttons = document.querySelectorAll(".button");

    buttons.forEach((button) => {
        const split = new SplitText(button, {
            type: "chars",
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

                // Animate out (up)
                gsap.to(char, {
                    yPercent: -100,
                    duration: 0.35,
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
                            duration: 0.35,
                            ease: "back.out"
                        });
                    }
                });
            });
        });

        button.addEventListener("mouseleave", () => {
            // Animate each char out (down), then back in from top
            [...split.chars].reverse().forEach((char, i) => {
                const delay = i * 0.03;

                gsap.to(char, {
                    yPercent: 100,
                    duration: 0.35,
                    ease: "back.in",
                    delay,
                    onComplete: () => {
                        gsap.set(char, {
                            yPercent: -100
                        });
                        char.classList.remove("button-char--bold");

                        gsap.to(char, {
                            yPercent: 0,
                            duration: 0.35,
                            ease: "back.out"
                        });
                    }
                });
            });
        });
    });
}
