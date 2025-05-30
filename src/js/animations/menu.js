import { gsap } from "gsap";
import { toggleBurger } from "./burger.js";

export function initMenuSlideToggle() {
    const menuToggle = document.querySelector(".header__menu-toggle");
    const menu = document.querySelector(".header__menu");
    const menuLinks = menu.querySelectorAll("a");

    const menuTl = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
            gsap.set(menuLinks, { autoAlpha: 0 }); // Hide links after menu closes
        }
    });


    menuTl.to(menu, {
        duration: 0.4,
        width: "25%",
        autoAlpha: 1,
        ease: "power1.inOut",
    });

    menuTl.to(menu, {
        duration: 0.4,
        height: () => menu.scrollHeight, // recalculate at runtime
        ease: "power1.inOut",
    }, ">");

    // Fire after menu opens (forward play only)
    menuTl.eventCallback("onComplete", () => {
        if (isOpen) linksIn.restart();
    });

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
        toggleBurger();
        isOpen = true;
    }

    function closeMenu() {
        linksIn.kill(); // Stop any ongoing link animations
        gsap.set(menuLinks, { autoAlpha: 0, y: -20 }); // Hide links immediately
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
