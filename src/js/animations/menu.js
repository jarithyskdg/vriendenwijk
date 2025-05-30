import { gsap } from "gsap";
import { toggleBurger } from "./burger.js";

export function initMenuSlideToggle() {
    const menuToggle = document.querySelector(".header__menu-toggle");
    const menu = document.querySelector(".header__menu");
    const menuLinks = menu.querySelectorAll("a");

    // Main timeline for container height + visibility
    const menuTl = gsap.timeline({ paused: true });
    menuTl.to(menu, {
        duration: 0.5,
        height: "auto",
        autoAlpha: 1,
        ease: "power2.inOut",
        // onStart: () => {
        //     menu.style.display = "block"; // ensure visible before animation
        // },
        // onReverseComplete: () => {
        //     menu.style.display = "none"; // hide after closing
        // }
    });

    // Separate links animation (play only when opening)
    const linksIn = gsap.from(menuLinks, {
        y: -20,
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.2,
        paused: true
    });

    let isOpen = false;

    function openMenu() {
        menuTl.play();
        linksIn.restart(); // restart links animation every time we open
        toggleBurger();
        isOpen = true;
    }

    function closeMenu() {
        menuTl.reverse();
        toggleBurger();
        isOpen = false;
    }

    function toggleMenu() {
        isOpen ? closeMenu() : openMenu();
    }

    menuToggle.addEventListener("click", toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (isOpen) {
                closeMenu();
            }
        });
    });
}
