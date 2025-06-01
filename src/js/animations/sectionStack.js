import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";

gsap.registerPlugin(ScrollTrigger);

export function setupPinnedSections() {
    const breakpoint = getCurrentBreakpoint();

    // Only enable section stacking on desktop
    if (breakpoint !== "desktop") {
        return;
    }

    const panels = gsap.utils.toArray(".panel");

    // Create a ScrollTrigger for each panel to track start position
    const tops = panels.map(panel =>
        ScrollTrigger.create({
            trigger: panel,
            start: "top top"
        })
    );

    // Pin each panel, optionally depending on height
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

    // Add snapping between panels
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

    // Refresh layout after setup to fix layout jumpiness
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500); // Tweak this delay if needed
}
