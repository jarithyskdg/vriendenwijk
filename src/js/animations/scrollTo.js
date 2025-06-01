import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollSmoother, ScrollTrigger);

export function scrollToSection(target) {
    if (!target) return;

    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const smoother = ScrollSmoother.get();

    // Refresh ScrollTrigger layout before scroll
    ScrollTrigger.refresh();

    // Delay the scroll slightly to avoid race conditions with pinned layout
    setTimeout(() => {
        if (smoother) {
            smoother.scrollTo(targetElement, true, "top top");
        } else {
            gsap.to(window, {
                scrollTo: {
                    y: targetElement,
                    offsetY: 50,
                },
                duration: 1,
                ease: "power2.out",
            });
        }
    }, 100); // You can tweak this delay if needed
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
