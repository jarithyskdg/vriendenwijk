// scrollTo.js

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollToPlugin, ScrollSmoother);

export function scrollToSection(target) {
    const smoother = ScrollSmoother.get(); // get the smoother instance

    if (!target) return;

    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    if (smoother) {
        smoother.scrollTo(targetElement, true, "top top");
    } else {
        gsap.to(window, {
            scrollTo: {
                y: targetElement,
                offsetY: 50, // adjust if you have fixed headers
            },
            duration: 1,
            ease: "power2.out",
        });
    }
}

export function initScrollToLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", e => {
            e.preventDefault();
            const href = anchor.getAttribute("href");
            if (href && href.length > 1) {
                scrollToSection(href);
            }
        });
    });
}
