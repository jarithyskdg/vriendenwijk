import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setupPinnedSections() {
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
        // Skip pinning the last panel (e.g., "portal")
        if (index === panels.length - 1) return;

        ScrollTrigger.create({
            trigger: panel,
            start: () =>
                panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
            pin: true,
            pinSpacing: false,
            markers: false // set to true for debugging
        });
    });


    // Add snapping between panels
    ScrollTrigger.create({
        snap: {
            snapTo: (progress, self) => {
                const scrollMax = ScrollTrigger.maxScroll(window);
                const currentScroll = self.scroll();

                // If we're near the bottom (footer), skip snap
                if (scrollMax - currentScroll < window.innerHeight * 0.5) return progress;

                const panelStarts = tops.map(st => st.start);
                const snapScroll = gsap.utils.snap(panelStarts, currentScroll);
                return gsap.utils.normalize(0, scrollMax, snapScroll);
            },
            duration: 0.5,
            ease: "power1.inOut"
        }
    });
}
