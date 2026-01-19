import { gsap } from "gsap";

export function animateOverviewLinks() {
    // Only activate hover effect on devices with a fine pointer (e.g. mouse)
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches === false) {
        return;
    }

    const links = document.querySelectorAll(".detail-link");

    links.forEach(link => {
        const title = link.querySelector(".detail-link-title");
        const arrow = link.querySelector(".detail-link-arrow");

        // Skip if something is missing
        if (!title || !arrow) return;

        // Create timeline
        const tl = gsap.timeline({ paused: true });

        tl.to(title, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        });

        tl.fromTo(arrow, 
            {x: -16, opacity: 0},
            {x: 0, opacity: 1, duration: 0.3, ease: "power2.out"},
            "-=0.3"
        );

        title.addEventListener("mouseenter", () => tl.play());
        title.addEventListener("mouseleave", () => tl.reverse());
    });
}
