import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateFooter() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const footer = document.querySelector("#footer");
    if (!footer) return;

    const logo = footer.querySelector(".footer__logo");
    const links = footer.querySelectorAll(".footer__link-item");
    const contactTitle = footer.querySelector(".contact-info__title h2");
    const contactDetails = footer.querySelectorAll(".contact-info__details p");
    const socialsTitle = footer.querySelector(".socials__title h2");
    const socialIcons = footer.querySelectorAll(".socials__links a");

    // Create timeline
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: footer,
            start: "top 80%",
            toggleActions: "play none resume reverse",
            markers: false
        }
    });

    tl.from(logo, {
        autoAlpha: 0,
        y: 50,
        duration: 0.6,
        ease: "power2.out"
    });

    tl.from(links, {
        autoAlpha: 0,
        y: 40,
        duration: 0.4,
        stagger: prefersReducedMotion ? 0 : 0.15,
        ease: "power2.out"
    }, prefersReducedMotion ? "=" : "-=0.4");

    tl.from(contactTitle, {
        autoAlpha: 0,
        y: 40,
        duration: 0.5,
        ease: "power2.out"
    }, prefersReducedMotion ? "=" : "-=0.3");

    tl.from(contactDetails, {
        autoAlpha: 0,
        y: 40,
        duration: 0.4,
        stagger: prefersReducedMotion ? 0 : 0.1,
        ease: "power2.out"
    }, prefersReducedMotion ? "=" : "-=0.3");

    tl.from(socialsTitle, {
        autoAlpha: 0,
        y: 40,
        duration: 0.5,
        ease: "power2.out"
    }, prefersReducedMotion ? "=" : "-=0.3");

    tl.from(socialIcons, {
        autoAlpha: 0,
        y: 35,
        duration: 0.4,
        stagger: prefersReducedMotion ? 0 : 0.2,
        ease: "power2.out"
    }, prefersReducedMotion ? "=" : "-=0.3");
}

export function animateFooterLinks() {
    // Only activate hover effect on devices with a fine pointer (e.g. mouse)
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches === false) {
        return;
    }

    const links = document.querySelectorAll(".footer__link-item");

    links.forEach(link => {
        const tl = gsap.timeline({ paused: true });

        tl.to(link, {
            scale: 1.075,
            duration: 0.3,
            ease: "power2.out"
        });

        link.addEventListener("mouseenter", () => {
            tl.play();
        });

        link.addEventListener("mouseleave", () => {
            tl.reverse();
        });
    });
}


