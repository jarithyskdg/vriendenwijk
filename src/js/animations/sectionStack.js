import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCurrentBreakpoint } from "../helpers/breakpoints";
import { isProgrammaticScroll } from "../helpers/globals";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function setupPinnedSections() {
    const breakpoint = getCurrentBreakpoint();

    // Exit early → normal scrolling
    if (
        prefersReducedMotion() ||
        breakpoint !== "desktop" ||
        isProgrammaticScroll()
    ) {
        // Optional safety cleanup if this runs after being enabled once
        ScrollTrigger.getAll().forEach(st => {
            if (st.trigger?.classList?.contains("panel")) {
                st.kill();
            }
        });

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

        gsap.to(panel, {
            opacity: 0,
            scale: 0.85,
            y: 50,
            scrollTrigger: {
                trigger: panel,
                scrub: true,
                start: "bottom bottom",
                pin: true,
                pinSpacing: false
            }
        });
    });

    // Snapping behavior
    // ScrollTrigger.create({
    //     snap: {
    //         snapTo: (progress, self) => {
    //             const scrollMax = ScrollTrigger.maxScroll(window);
    //             const currentScroll = self.scroll();

    //             if (scrollMax - currentScroll < window.innerHeight * 0.5) return progress;

    //             const panelStarts = tops.map(st => st.start);
    //             const snapScroll = gsap.utils.snap(panelStarts, currentScroll);
    //             return gsap.utils.normalize(0, scrollMax, snapScroll);
    //         },
    //         duration: 1,
    //         ease: "power1.inOut"
    //     }
    // });

    // Final layout refresh
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);
}
