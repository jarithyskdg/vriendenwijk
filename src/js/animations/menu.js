import { gsap } from "gsap";
import { toggleBurger } from "./burger.js";

export function initMenuSlideToggle() {
    const menuToggle = document.querySelector(".header__menu-toggle");
    const menu = document.querySelector(".header__menu");
    const menuLinks = menu.querySelectorAll("a");

    const tl = gsap.timeline({ paused: true, reversed: true });

    tl.to(menu, {
        duration: 0.5,
        // scaleY: 1,
        height: "auto",
        // opacity: 1,
        ease: "power3.out"
    })
    .to("ul li", {
        duration: 0.5,
        autoAlpha: 1,
        ease: "power3.out",
        stagger: 0.2
    }, "-=0.3");

    function toggleMenu() {
        tl.reversed() ? tl.play() : tl.reverse();
        toggleBurger(); // toggle icon as well
    }

    menuToggle.addEventListener("click", toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (!tl.reversed()) {
                tl.reverse();
                toggleBurger(); // close burger icon as well
            }
        });
    });
}
