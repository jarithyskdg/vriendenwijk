import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function animateInsights() {
    const section = document.querySelector("#insights");
    if (!section) return;

    const title = section.querySelector(".insights__title h2");
    const cards = Array.from(section.querySelectorAll(".card--insights"));
    const cta = section.querySelector(".insights__cta .button");

    if (!title || !cards.length || !cta) return;
    if (prefersReducedMotion()) return;

    const breakpoint = getCurrentBreakpoint();
    const isDesktop = breakpoint === "desktop";

    // Track whether the user is currently navigating with keyboard
    if (!document.documentElement.dataset.lastInput) {
        document.documentElement.dataset.lastInput = "mouse";
        window.addEventListener("keydown", (e) => {
            if (e.key === "Tab") document.documentElement.dataset.lastInput = "keyboard";
        }, { capture: true });
        window.addEventListener("mousedown", () => {
            document.documentElement.dataset.lastInput = "mouse";
        }, { capture: true });
    }

    // Remove parallax attributes on non-desktop (your existing behavior)
    cards.forEach((card) => {
        if (!isDesktop) {
            card.removeAttribute("data-speed");
            card.removeAttribute("data-lag");
        }
    });

    // NEW: when keyboard focuses into Insights, disable lag/speed and normalize positions
    if (!section.dataset.keyboardFixAttached) {
        section.dataset.keyboardFixAttached = "true";

        section.addEventListener("focusin", () => {
            // Only do this for keyboard tabbing (avoid breaking mouse users)
            if (document.documentElement.dataset.lastInput !== "keyboard") return;

            // Disable parallax smoothing attributes
            cards.forEach((card) => {
                card.removeAttribute("data-speed");
                card.removeAttribute("data-lag");
            });

            // Kill ScrollTriggers that belong to these cards (so old transform state doesn't persist)
            ScrollTrigger.getAll().forEach((st) => {
                const t = st.trigger;
                if (t && (t === section || cards.includes(t))) {
                    st.kill(true);
                }
            });

            // Clear any transform/opacity left by GSAP so DOM is in a stable "scrolled-to" state
            gsap.set(cards, { clearProps: "transform" });

            // Rebuild animations without lag/speed
            // (Call animateInsights again, but avoid infinite loop)
            if (!section.dataset.rebuilding) {
                section.dataset.rebuilding = "true";
                requestAnimationFrame(() => {
                    section.dataset.rebuilding = "";
                    animateInsights();
                    ScrollTrigger.refresh();
                    ScrollTrigger.update();
                });
            }
        });
    }

    // Animate section title
    gsap.from(title, {
        scrollTrigger: {
            trigger: isDesktop ? section : title,
            start: isDesktop ? "top 80%" : "top 90%",
            end: isDesktop ? "center center" : "top center",
            scrub: 1,
            markers: false
        },
        y: isDesktop ? 60 : -60,
        opacity: 0,
        ease: "power2.out"
    });

    // Animate cards
    cards.forEach((card, index) => {
        const isEven = index % 2 === 0;

        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top center",
                markers: false
            },
            x: !isDesktop ? (isEven ? -100 : 100) : 0,
            y: isDesktop ? 80 : 0,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // CTA fade-in
    gsap.from(cta, {
        scrollTrigger: {
            trigger: isDesktop ? section : cta,
            start: isDesktop ? "40% 60%" : "top bottom",
            end: isDesktop ? "center center" : "top 90%",
            scrub: 1,
            markers: false
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    });
}