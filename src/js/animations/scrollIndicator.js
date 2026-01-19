// scrollIndicator.js
import { gsap } from "gsap";
import { prefersReducedMotion } from "../helpers/reducedMotion";

export function animateScrollIndicator() {
  if (prefersReducedMotion()) return;

  gsap.to(".indicator-1", {
    y: -8,
    duration: 0.6,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });

  gsap.to(".indicator-2", {
    y: -8,
    duration: 0.6,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    // delay: 0.3, // Uncomment to add wave effect
  });
}