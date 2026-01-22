import { gsap } from "gsap";
import { prefersReducedMotion } from "../helpers/reducedMotion";

export function detailContentSwitcher() {
    const buttons = document.querySelectorAll(".button--detail-content");
    const sections = document.querySelectorAll(".detail__content__body__section");

    let currentSection = null;

    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            const target = btn.dataset.target;
            if (!target) return;

            // Reset button active styling
            buttons.forEach(b => {
                b.classList.remove("is-active");
                animateButtonBubble(b, false);
                animateButtonSVG(b, false);
            });

            btn.classList.add("is-active");
            animateButtonBubble(btn, true);
            animateButtonSVG(btn, true);

            // Animate section switch
            const nextSection = document.getElementById(target);
            if (nextSection) switchSection(nextSection);
        });
    });

    // Auto activate first on load
    if (buttons[0]) {
        buttons[0].click();
    }

    // Section fade animation
    function switchSection(next) {
        if (currentSection === next) return;

        // Hide old
        if (currentSection) {
            currentSection.classList.add("hidden");

            if (!prefersReducedMotion()) {
                gsap.to(currentSection, {
                    autoAlpha: 0,
                    y: 20,
                    duration: 0.25,
                });
            }
        }

        // Show new
        next.classList.remove("hidden");
        if (!prefersReducedMotion()) {
            gsap.fromTo(next,
                { autoAlpha: 0, y: -20 },
                { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }
            );
        }

        currentSection = next;
    }

    // Button bubble animation
    function animateButtonBubble(button, active) {
        const bubble = button.querySelector(".button__bubble");

        gsap.to(bubble, {
            scale: active ? 1 : 0,
            opacity: active ? 1 : 0,
            duration: 0.35,
            ease: active ? "back.out(1.7)" : "power1.inOut"
        });
    }

    // SVG color animation
    function animateButtonSVG(button, active) {
        const svgPath = button.querySelector("svg path");
        if (!svgPath) return;

        gsap.to(svgPath, {
            stroke: active ? "#BAC8B1" : "#404E3B",
            duration: 0.35,
            ease: "power1.inOut"
        });
    }
}
