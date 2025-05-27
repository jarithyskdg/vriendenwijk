import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function animateHome() {
    let tl = gsap.timeline();

    //logo animation
    tl.from(".home__logo", {
        y: -165,
        duration: 0.7,
        ease: "power1.out",
    });

    //subtitle animation
    document.fonts.ready.then(() => {
        let split = SplitText.create(".home__subtitle", {
            type: "words",
            onSplit: (self) => {
                tl.from(self.words, {
                    y: -100,
                    rotation: "random(-80, 80)",
                    duration: 0.7,
                    ease: "back",
                    stagger: 0.15,
                    autoAlpha: 0,
                    // onComplete: () => self.revert()
                });
            }
        });
    })
}