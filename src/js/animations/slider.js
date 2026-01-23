import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export function initSlider() {
    const slider = document.querySelector(".slider");
    if (!slider) return;

    const isTouchDevice = () =>
        window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    function moveCard() {
        const lastItem = slider.querySelector(".slider__item:last-child");
        if (!lastItem) return;

        lastItem.style.display = "none";

        const newItem = document.createElement("img");
        newItem.className = lastItem.className;
        newItem.src = lastItem.src;

        slider.insertBefore(newItem, slider.firstChild);
    }

    function handleClick() {
        const state = Flip.getState(".slider__item");

        moveCard();

        Flip.from(state, {
            targets: ".slider__item",
            ease: isTouchDevice() ? "power2.inOut" : "sine.inOut",
            absolute: true,

            onEnter: elements =>
                gsap.from(elements, {
                    duration: isTouchDevice() ? 1 : 0.3,
                    yPercent: isTouchDevice() ? 0 : 20,
                    opacity: 0,
                    ease: isTouchDevice() ? "power2.inOut" : "expo.out"
                }),

            onLeave: elements =>
                gsap.to(elements, {
                    duration: isTouchDevice() ? 1 : 0.3,
                    yPercent: isTouchDevice() ? 0 : 5,
                    xPercent: isTouchDevice() ? 0 : -5,
                    transformOrigin: isTouchDevice() ? "center center" : "bottom left",
                    opacity: 0,
                    ease: isTouchDevice() ? "power2.inOut" : "expo.out",
                    onComplete() {
                        slider.removeChild(elements[0]);
                    }
                })
        });
    }

    slider.addEventListener("click", handleClick);
}
