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
            }, 1000); // adjust duration based on scroll speed
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




//Alternative code where all screen sizes use their native scroll behavior


// import { gsap } from "gsap";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollToPlugin, ScrollSmoother, ScrollTrigger);

// export function scrollToSection(target) {
//     if (!target) return;

//     const targetElement = document.querySelector(target);
//     if (!targetElement) return;

//     // Refresh ScrollTrigger layout in case any changes occurred
//     ScrollTrigger.refresh();

//     setTimeout(() => {
//         // Special case: scroll to top of page if target is #home
//         if (target === "#home") {
//             window.scrollTo({
//                 top: 0,
//                 behavior: "smooth"
//             });
//             return;
//         }

//         // Use native smooth scroll for all screen sizes
//         const y = targetElement.getBoundingClientRect().top + window.scrollY;

//         window.scrollTo({
//             top: y,
//             behavior: "smooth"
//         });
//     }, 100); // Delay helps ensure layout has settled
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

