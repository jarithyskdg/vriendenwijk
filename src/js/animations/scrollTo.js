import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";

gsap.registerPlugin(ScrollToPlugin, ScrollSmoother, ScrollTrigger);

export function scrollToSection(target) {
    if (!target) return;

    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const smoother = ScrollSmoother.get();
    const breakpoint = window.innerWidth >= 1200 ? "desktop" : "mobile";

    // Always refresh to avoid layout issues
    ScrollTrigger.refresh();

    setTimeout(() => {
        // SPECIAL CASE: Scroll to top of page if target is #home
        if (target === "#home") {
            if (smoother && breakpoint === "desktop") {
                smoother.scrollTo(0, true);
            } else {
                gsap.to(window, {
                    scrollTo: 0,
                    duration: 1,
                    ease: "power2.out",
                });
            }
            return;
        }

        // Normal section scroll behavior
        if (smoother && breakpoint === "desktop") {
            smoother.scrollTo(targetElement, true, "top top");
        } else {
            gsap.to(window, {
                scrollTo: {
                    y: targetElement,
                    // offsetY: 50, // adjust for fixed headers if needed
                },
                duration: 1,
                ease: "power2.out",
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

//alternative code where mobile relies on its native scroll behavior

// import { gsap } from "gsap";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { getCurrentBreakpoint } from "../helpers/breakpoints";

// gsap.registerPlugin(ScrollToPlugin, ScrollSmoother, ScrollTrigger);

// export function scrollToSection(target) {
//     if (!target) return;

//     const targetElement = document.querySelector(target);
//     if (!targetElement) return;

//     const smoother = ScrollSmoother.get();
//     const breakpoint = getCurrentBreakpoint(); // "desktop", "tablet", "mobile"

//     // Always refresh layout before scroll
//     ScrollTrigger.refresh();

//     setTimeout(() => {
//         // Special case: if #home, scroll to very top of page
//         if (target === "#home") {
//             if (smoother && breakpoint === "desktop") {
//                 smoother.scrollTo(0, true);
//             } else {
//                 window.scrollTo({
//                     top: 0,
//                     behavior: "smooth"
//                 });
//             }
//             return;
//         }

//         // Default scroll behavior
//         if (smoother && breakpoint === "desktop") {
//             smoother.scrollTo(targetElement, true, "top top");
//         } else {
//             // Mobile/tablet fallback using native smooth scroll
//             const y = targetElement.getBoundingClientRect().top + window.scrollY;

//             window.scrollTo({
//                 top: y,
//                 behavior: "smooth"
//             });
//         }
//     }, 100); // Slight delay helps with layout stabilization
// }

// export function initScrollToLinks() {
//     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//         anchor.addEventListener("click", e => {
//             e.preventDefault();
//             const href = anchor.getAttribute("href");
//             if (href && href.length > 1) {
//                 scrollToSection(href);
//             }
//         });
//     });
// }

