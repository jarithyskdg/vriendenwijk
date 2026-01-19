const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

export function prefersReducedMotion() {
    return motionQuery.matches;
}

export function onReducedMotionChange(callback) {
    motionQuery.addEventListener("change", callback);
}
