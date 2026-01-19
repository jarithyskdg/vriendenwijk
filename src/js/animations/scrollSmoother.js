// scrollSmoother.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { prefersReducedMotion } from "../helpers/reducedMotion";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function initScrollSmoother() {
  if (prefersReducedMotion()) {
    // Safety: kill any existing smoother instance
    ScrollSmoother.get()?.kill();
    return;
  }

  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    effects: true, // looks for data-speed and data-lag attributes on elements
    // normalizeScroll: true, // prevents native scroll jank
    ease: "power1.out", // the ease that the scroll should use
    smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  });
}
