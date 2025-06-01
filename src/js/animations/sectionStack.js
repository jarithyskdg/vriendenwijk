import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";
import { isProgrammaticScroll } from "../helpers/globals";

gsap.registerPlugin(ScrollTrigger);

export function setupPinnedSections() {
    const breakpoint = getCurrentBreakpoint();

    if (breakpoint !== "desktop" || isProgrammaticScroll()) {
        return;
    }

    const panels = gsap.utils.toArray(".panel");

    // Track start positions
    const tops = panels.map(panel =>
        ScrollTrigger.create({
            trigger: panel,
            start: "top top"
        })
    );

    // Pin each panel
    panels.forEach((panel, index) => {
        if (index === panels.length - 1) return;

        ScrollTrigger.create({
            trigger: panel,
            start: () =>
                panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
            pin: true,
            pinSpacing: false,
            markers: false
        });
    });

    // Snapping behavior
    ScrollTrigger.create({
        snap: {
            snapTo: (progress, self) => {
                const scrollMax = ScrollTrigger.maxScroll(window);
                const currentScroll = self.scroll();

                if (scrollMax - currentScroll < window.innerHeight * 0.5) return progress;

                const panelStarts = tops.map(st => st.start);
                const snapScroll = gsap.utils.snap(panelStarts, currentScroll);
                return gsap.utils.normalize(0, scrollMax, snapScroll);
            },
            duration: 0.5,
            ease: "power1.inOut"
        }
    });

    // Final layout refresh
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);
}
