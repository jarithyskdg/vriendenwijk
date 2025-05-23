import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// create the scrollSmoother before your scrollTriggers
ScrollSmoother.create({
    wrapper: "#smooth-wrapper", // the element that wraps everything
    content: "#smooth-content", // the element that wraps all the scrollable content
    smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true, // looks for data-speed and data-lag attributes on elements
    normalizeScroll: true, // prevents native scroll jank
    ease: "expo.out", // the ease that the scroll should use
    smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
});