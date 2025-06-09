import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";
import { setProgrammaticScroll } from "../helpers/globals";

gsap.registerPlugin(ScrollToPlugin, ScrollSmoother, ScrollTrigger);

export function scrollToSection(target) {
    if (!target) return;

    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const smoother = ScrollSmoother.get();
    const breakpoint = getCurrentBreakpoint();

    // Set the programmatic scroll flag
    setProgrammaticScroll(true);

    ScrollTrigger.refresh();

    setTimeout(() => {
        if (target === "#home") {
            if (smoother && breakpoint === "desktop") {
                smoother.scrollTo(0, true);
            } else {
                gsap.to(window, {
                    scrollTo: 0,
                    duration: 1,
                    ease: "power2.out",
                    onComplete: () => setProgrammaticScroll(false)
                });
            }
            return;
        }

        if (smoother && breakpoint === "desktop") {
            smoother.scrollTo(targetElement, true);
            setTimeout(() => {
                setProgrammaticScroll(false);
            }, 1000);
        } else {
            gsap.to(window, {
                scrollTo: {
                    y: targetElement
                },
                duration: 1,
                ease: "power2.out",
                onComplete: () => setProgrammaticScroll(false)
            });
        }
    }, 100);
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