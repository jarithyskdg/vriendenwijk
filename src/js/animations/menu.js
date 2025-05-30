import { gsap } from "gsap";
import { toggleBurger } from "./burger.js";
import { getMenuWidth } from "../helpers/breakpoints.js";

export function initMenuSlideToggle() {
    const menuToggle = document.querySelector(".header__menu-toggle");
    const menu = document.querySelector(".header__menu");
    const menuLinks = menu.querySelectorAll("a");

    let isOpen = false;

    const menuTl = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
            gsap.set(menuLinks, { autoAlpha: 0 }); // Hide links after menu closes
        }
    });

    function getCurrentMenuWidth() {
        return getMenuWidth(); // e.g. "25%", "40%", or "80%"
    }

    menuTl.to(menu, {
        duration: 0.4,
        width: getCurrentMenuWidth(),
        autoAlpha: 1,
        ease: "power1.inOut",
    });

    menuTl.to(menu, {
        duration: 0.4,
        height: () => menu.scrollHeight, // recalc height at runtime
        ease: "power1.inOut",
    }, ">");

    // Animate menu links in after menu opens
    const linksIn = gsap.from(menuLinks, {
        y: -20,
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.1,
        paused: true
    });

    menuTl.eventCallback("onComplete", () => {
        if (isOpen) linksIn.restart();
    });

    function openMenu() {
        menuTl.play();
        toggleBurger();
        isOpen = true;
    }

    function closeMenu() {
        linksIn.kill(); // Stop link animation
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

    // // Optional: Update menu width on window resize if menu is open
    // window.addEventListener("resize", () => {
    //     if (isOpen) {
    //         gsap.to(menu, {
    //             duration: 0.3,
    //             width: getCurrentMenuWidth(),
    //             ease: "power1.inOut",
    //         });
    //     }
    // });
}
