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
        return getMenuWidth();
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
        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("touchstart", handleOutsideClick);
        document.addEventListener("keydown", handleEscapeKey);
    }

    function closeMenu() {
        linksIn.kill();
        gsap.set(menuLinks, { autoAlpha: 0, y: -20 });
        menuTl.reverse();
        toggleBurger();
        isOpen = false;
        document.removeEventListener("mousedown", handleOutsideClick);
        document.removeEventListener("touchstart", handleOutsideClick);
        document.removeEventListener("keydown", handleEscapeKey);
    }

    function toggleMenu() {
        isOpen ? closeMenu() : openMenu();
    }

    function handleOutsideClick(event) {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    }

    function handleEscapeKey(event) {
        if (event.key === "Escape") {
            closeMenu();
        }
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

export function menuItemHoverEffect() {
    // Only activate hover effect on devices with a fine pointer (e.g. mouse)
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches === false) {
        return;
    }

    const menuItems = document.querySelectorAll(".header__menu__item");

    menuItems.forEach(item => {
        const border = item.querySelector(".border");
        if (!border) return;

        const tl = gsap.timeline({ paused: true });
        tl.to(border, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        });

        item.addEventListener("mouseenter", () => {
            tl.play();
        });

        item.addEventListener("mouseleave", () => {
            tl.reverse();
        });
    });
}


