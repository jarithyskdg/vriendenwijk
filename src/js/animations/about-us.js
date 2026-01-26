import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { getCurrentBreakpoint } from "../helpers/breakpoints";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function animateAboutUs() {
    const section = document.querySelector("#about-us");
    if (!section) return;

    const items = Array.from(section.querySelectorAll(".about-us__item"));
    const cta = section.querySelector(".about-us__cta");

    if (!items.length || !cta) return;
    if (prefersReducedMotion()) return;

    const breakpoint = getCurrentBreakpoint();

    // Read animation colors from CSS variables (defined on .about-us)
    const styles = getComputedStyle(section);

    const baseColor =
        styles.getPropertyValue("--about-us-accent-base").trim() || "#000000";

    const colors = [
        styles.getPropertyValue("--about-us-accent-1").trim(),
        styles.getPropertyValue("--about-us-accent-2").trim(),
        styles.getPropertyValue("--about-us-accent-3").trim()
    ].filter(Boolean);

    const splits = [];

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: breakpoint === "mobile" ? "top 75%" : "25% 85%",
            end: breakpoint === "mobile" ? "center 40%" : "center center",
            toggleActions: "play none none reverse",
            markers: false,
            onLeaveBack: () => {
                section.querySelectorAll(".about-us-accent").forEach(ch => {
                    ch.style.color = baseColor;
                });
            }
        }
    });

    const icons = items.map(i => i.querySelector(".about-us__icon")).filter(Boolean);
    const titles = items.map(i => i.querySelector(".about-us__title")).filter(Boolean);
    const textEls = items.map(i => i.querySelector(".about-us__text")).filter(Boolean);

    // Split texts into lines
    const textSplits = textEls.map(el => {
        const split = new SplitText(el, {
            type: "lines",
            linesClass: "about-us-line",
            mask: "lines"
        });
        splits.push(split);
        return split;
    });

    // Set all lines to hidden start state
    textSplits.forEach(split => {
        gsap.set(split.lines, { yPercent: 120, autoAlpha: 1 });
    });

    // Cards
    tl.from(items, {
        autoAlpha: 0,
        y: 24,
        scale: 0.85,
        duration: 0.45,
        ease: "power2.out",
        clearProps: "transform"
    });

    // Icons
    tl.from(icons, {
        y: breakpoint === "mobile" ? -16 : -22,
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.out"
    }, ">-0.1");

    // Titles
    tl.from(titles, {
        y: 10,
        autoAlpha: 0,
        duration: 0.25,
        ease: "power2.out"
    }, ">-0.1");

    // Texts: cards start together, text has staggered lines
    tl.addLabel("textStart", ">-0.05");

    textSplits.forEach((split) => {
        tl.to(
            split.lines,
            {
                yPercent: 0,
                duration: 0.45,
                ease: "expo.out",
                stagger: 0.06
            },
            "textStart"
        );
    });

    // CTA
    tl.from(cta, {
        y: 24,
        autoAlpha: 0,
        duration: 0.35,
        ease: "power2.out"
    }, ">-0.05");

    // Accent flash
    tl.addLabel("accentFlash", ">");

    items.forEach((item) => {
        const itemAccents = Array.from(item.querySelectorAll(".accent"));
        if (!itemAccents.length) return;

        const split = new SplitText(itemAccents, {
            type: "words, chars",
            charsClass: "about-us-accent",
            mask: "chars"
        });
        splits.push(split);

        gsap.set(split.chars, { color: baseColor });

        tl.to(
            split.chars,
            {
                stagger: 0.02,
                keyframes: [
                    { color: (i) => gsap.utils.wrap(colors, i), duration: 0.12, ease: "none" },
                    { color: baseColor, duration: 0.2, ease: "none" }
                ]
            },
            "accentFlash"
        );
    });
}