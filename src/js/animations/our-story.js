import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { getCurrentBreakpoint } from "../helpers/breakpoints";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function animateOurStory() {
    const section = document.querySelector("#our-story");
    if (!section) return;

    const logo = section.querySelector(".logo--small");
    const title = section.querySelector(".our-story__title");
    const paragraphs = Array.from(section.querySelectorAll(".our-story__content p"));
    const cols = Array.from(section.querySelectorAll(".our-story__col"));

    if (!logo || !title || !paragraphs.length) return;
    if (prefersReducedMotion()) return;

    const breakpoint = getCurrentBreakpoint();

    // Detect 2-column layout breakpoint
    const isTwoColumnLayout = window.matchMedia("(min-width: 1024px)").matches;

    // Split all paragraphs into masked lines, and keep a map so we can group by column
    const splitByParagraph = new Map();
    const splits = paragraphs.map((p) => {
        const split = new SplitText(p, {
            type: "lines",
            linesClass: "our-story-line",
            mask: "lines"
        });
        splitByParagraph.set(p, split);
        return split;
    });

    const allLines = splits.flatMap((s) => s.lines);
    gsap.set(allLines, { yPercent: 120, autoAlpha: 1 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: breakpoint === "mobile" ? "top 75%" : "20% 85%",
            end: "center center",
            toggleActions: "play none none reverse",
            markers: false
        }
    });

    tl.from(logo, {
        y: -50,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.out"
    });

    tl.from(title, {
        y: -50,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.35");

    tl.addLabel("linesStart", "-=0.15");

    if (isTwoColumnLayout && cols.length >= 2) {
        const getLinesForCol = (colEl) => {
            const colParagraphs = Array.from(colEl.querySelectorAll("p"));
            return colParagraphs.flatMap((p) => splitByParagraph.get(p)?.lines ?? []);
        };

        const col1Lines = getLinesForCol(cols[0]);
        const col2Lines = getLinesForCol(cols[1]);

        // Both columns start together, each column staggers internally
        tl.to(col1Lines, {
            yPercent: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.07
        }, "linesStart");

        tl.to(col2Lines, {
            yPercent: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.07
        }, "linesStart");
    } else {
        // Mobile/tablet: one continuous sequence across all lines
        tl.to(allLines, {
            yPercent: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.07
        }, "linesStart");
    }
}