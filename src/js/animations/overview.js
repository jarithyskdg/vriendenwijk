import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(SplitText, ScrollTrigger);

export function animateOverviewHeader() {
    const section = document.querySelector("#overview");
    if (!section) return;

    if (prefersReducedMotion()) return;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
            markers: false,
            once: true
        }
    });

    // Avoid double-splitting
    if (section.querySelector(".overview__title .word")) return;

    document.fonts.ready.then(() => {
        const split = SplitText.create(".overview__title", {
            type: "words",
            wordsClass: "overview-title-word",
            ignore: ".mobile-br"
        });

        tl.from(split.words, {
            y: -100,
            rotation: "random(-20, 20)",
            duration: 0.7,
            ease: "back",
            stagger: 0.15,
            autoAlpha: 0
        });
    });
}

export function animateOverviewSections() {
    if (prefersReducedMotion()) return;

    const sections = document.querySelectorAll(".divider");
    if (!sections.length) return;

    sections.forEach((divider, index) => {

        const isFirst = index === 0;

        const [lineLeft, lineRight] = divider.querySelectorAll(".divider__line");
        const title = divider.querySelector(".divider__title");

        // CARD SECTION = divider's immediate next sibling
        const cardSection = divider.nextElementSibling?.classList.contains("overview__cards")
            ? divider.nextElementSibling
            : null;

        // CARDS
        const cards = cardSection
            ? cardSection.querySelectorAll(".card--overview")
            : [];

        // SHOW MORE LINK = the next sibling AFTER .overview__cards
        const showMore = cardSection?.nextElementSibling?.classList.contains("link")
            ? cardSection.nextElementSibling
            : null;

        // ---- INITIAL STATES ----
        gsap.set(lineLeft, { autoAlpha: 0, scaleX: 0, transformOrigin: "right" });
        gsap.set(lineRight, { autoAlpha: 0, scaleX: 0, transformOrigin: "left" });

        if (cards.length) {
            gsap.set(cards, {
                autoAlpha: 0,
                y: 50
            });
        }

        if (showMore) {
            gsap.set(showMore, {
                autoAlpha: 0,
                y: 20
            });
        }

        // ---- TIMELINE ----
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: divider,
                start: "top 75%",
                toggleActions: "play none none none",
                markers: false,
                once: true
            }
        });

        // Delay only on first section
        if (isFirst) {
            tl.to({}, { duration: 0.5 });
        }

        // Divider title
        tl.from(title, {
            autoAlpha: 0,
            y: 10,
            duration: 0.3,
            ease: "power1.out"
        });

        // Divider lines outward
        tl.to([lineLeft, lineRight], {
            scaleX: 1,
            autoAlpha: 1,
            duration: 0.3,
            ease: "power1.out"
        }, "-=0.1");

        // Cards
        if (cards.length) {
            tl.to(cards, {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                ease: "power1.out",
                stagger: 0.2
            });
        }

        // Show more link
        if (showMore) {
            tl.to(showMore, {
                autoAlpha: 1,
                y: 0,
                duration: 0.25,
                ease: "power1.out"
            }, "-=0.1");
        }
    });
}