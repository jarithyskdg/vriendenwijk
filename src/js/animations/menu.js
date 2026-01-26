import { gsap } from "gsap";
import { toggleBurger } from "./burger.js";
import { getMenuWidth } from "../helpers/breakpoints.js";
import { Observer } from "gsap/Observer";
import { prefersReducedMotion } from "../helpers/reducedMotion.js";

gsap.registerPlugin(Observer);

export function initMenuSlideToggle() {
    const bodyWrapper = document.querySelector("#smooth-wrapper");
    const menuToggle = document.querySelector(".header__menu-toggle");
    const menu = document.querySelector(".header__menu");
    const overlay = document.querySelector(".menu-overlay");

    if (!menuToggle || !menu || !overlay) return;

    const menuLinks = menu.querySelectorAll(".header__menu-item, .header__menu-divider span");

    menu.setAttribute("id", "header-menu");
    menu.setAttribute("role", "menu");
    menuToggle.setAttribute("aria-haspopup", "true");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-controls", "header-menu");

    let isOpen = false;

    let scrollObserver = Observer.create({
        type: "wheel,touch",
        onChangeY: () => isOpen && closeMenu(),
        preventDefault: false,
        allowClicks: true,
        tolerance: 10,
        enabled: false
    });

    function getCurrentMenuWidth() {
        return getMenuWidth();
    }

    gsap.set(menu, { width: getCurrentMenuWidth() });

    // reduced motion version
    if (prefersReducedMotion()) {
        function openMenu() {
            menuToggle.setAttribute("aria-expanded", "true");
            bodyWrapper?.setAttribute("aria-hidden", "true");
            menu.removeAttribute("aria-hidden");

            gsap.set(overlay, { autoAlpha: 1, pointerEvents: "auto" });
            gsap.set(menu, {
                height: "100%",
                autoAlpha: 1,
                padding: "16px 0 32px"
            });
            gsap.set(menuLinks, { autoAlpha: 1, y: 0 });

            toggleBurger();
            isOpen = true;
            scrollObserver.enable();
            document.addEventListener("keydown", handleEscapeKey);
        }

        function closeMenu() {
            menuToggle.setAttribute("aria-expanded", "false");
            bodyWrapper?.removeAttribute("aria-hidden");
            menu.setAttribute("aria-hidden", "true");

            gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
            gsap.set(menu, { autoAlpha: 0, height: 0 });
            gsap.set(menuLinks, { autoAlpha: 0, y: 0 });

            toggleBurger();
            isOpen = false;
            scrollObserver.disable();
            document.removeEventListener("keydown", handleEscapeKey);
        }

        function toggleMenu() {
            isOpen ? closeMenu() : openMenu();
        }

        function handleEscapeKey(e) {
            if (e.key === "Escape") closeMenu();
        }

        overlay.addEventListener("click", () => isOpen && closeMenu());
        menuToggle.addEventListener("click", toggleMenu);
        menuLinks.forEach(link =>
            link.addEventListener("click", () => isOpen && closeMenu())
        );

        return;
    }

    // normal animated version
    const menuTl = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
            gsap.set(menuLinks, { autoAlpha: 0 });
        }
    });

    menuTl.to(overlay, {
        duration: 0.4,
        autoAlpha: 1,
        ease: "power1.inOut"
    }, "0");

    menuTl.to(menu, {
        duration: 0.4,
        height: "100%",
        autoAlpha: 1,
        padding: "16px 0 32px",
        ease: "power1.inOut",
    }, "0");

    const linksIn = gsap.from(menuLinks, {
        y: -20,
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.07,
        paused: true
    }, "=-0.6");

    menuTl.eventCallback("onStart", () => {
        overlay.style.pointerEvents = "auto";
    });

    menuTl.eventCallback("onComplete", () => {
        if (isOpen) linksIn.restart();
    });

    menuTl.eventCallback("onReverseComplete", () => {
        overlay.style.pointerEvents = "none";
    });

    function openMenu() {
        menuToggle.setAttribute("aria-expanded", "true");
        bodyWrapper?.setAttribute("aria-hidden", "true");
        menu.removeAttribute("aria-hidden");

        menuTl.play();
        toggleBurger();
        isOpen = true;
        scrollObserver.enable();
        document.addEventListener("keydown", handleEscapeKey);
    }

    function closeMenu() {
        menuToggle.setAttribute("aria-expanded", "false");
        bodyWrapper?.removeAttribute("aria-hidden");
        menu.setAttribute("aria-hidden", "true");

        linksIn.kill();
        gsap.set(menuLinks, { autoAlpha: 0, y: -20 });
        menuTl.reverse();
        toggleBurger();
        isOpen = false;
        scrollObserver.disable();
        document.removeEventListener("keydown", handleEscapeKey);
    }

    function toggleMenu() {
        isOpen ? closeMenu() : openMenu();
    }

    function handleEscapeKey(event) {
        if (event.key === "Escape") closeMenu();
    }

    overlay.addEventListener("click", () => {
        if (isOpen) closeMenu();
    });

    menuToggle.addEventListener("click", toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (isOpen) closeMenu();
        });
    });
}

export function menuItemHoverEffect() {
    if (prefersReducedMotion() || window.matchMedia("(hover: hover) and (pointer: fine)").matches === false) return;

    const links = document.querySelectorAll(".header__menu-item");

    links.forEach(link => {
        const tl = gsap.timeline({ paused: true });

        tl.to(link, {
            scale: 1.25,
            duration: 0.4,
            ease: "power2.out"
        });

        link.addEventListener("mouseenter", () => tl.play());
        link.addEventListener("mouseleave", () => tl.reverse());
    });
}