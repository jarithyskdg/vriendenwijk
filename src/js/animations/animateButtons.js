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

export function magneticButtonEffect() {
    class Button {
        constructor(buttonElement) {
            this.block = buttonElement;
            this.init();
            this.initEvents();
        }

        init() {
            const el = gsap.utils.selector(this.block);

            this.DOM = {
                button: this.block,
                flair: el(".button__flair")
            };

            this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
            this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
        }

        getXY(e) {
            const {
                left,
                top,
                width,
                height
            } = this.DOM.button.getBoundingClientRect();

            const xTransformer = gsap.utils.pipe(
                gsap.utils.mapRange(0, width, 0, 100),
                gsap.utils.clamp(0, 100)
            );

            const yTransformer = gsap.utils.pipe(
                gsap.utils.mapRange(0, height, 0, 100),
                gsap.utils.clamp(0, 100)
            );

            return {
                x: xTransformer(e.clientX - left),
                y: yTransformer(e.clientY - top)
            };
        }

        initEvents() {
            this.DOM.button.addEventListener("mouseenter", (e) => {
                const { x, y } = this.getXY(e);

                this.xSet(x);
                this.ySet(y);

                gsap.to(this.DOM.flair, {
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });

            this.DOM.button.addEventListener("mouseleave", (e) => {
                const { x, y } = this.getXY(e);

                gsap.killTweensOf(this.DOM.flair);

                gsap.to(this.DOM.flair, {
                    xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
                    yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
                    scale: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            this.DOM.button.addEventListener("mousemove", (e) => {
                const { x, y } = this.getXY(e);

                gsap.to(this.DOM.flair, {
                    xPercent: x,
                    yPercent: y,
                    duration: 0.4,
                    ease: "power2"
                });
            });
        }
    }

    const buttonElements = document.querySelectorAll('[data-block="button"]');

    buttonElements.forEach((buttonElement) => {
        new Button(buttonElement);
    });

}
